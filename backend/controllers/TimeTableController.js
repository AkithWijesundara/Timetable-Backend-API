const TimeTable = require("../models/TimeTable.model");
const Session = require("../models/Session.model");
const { validateRole, newvalidateRole } = require("./exports/validateRole");
const Enroll = require("../models/Enroll.model");

//create timetable

const createTimeTable =  async(req,res)=>{

    const {
        course,
        timeTableData
    } = req.body;

    try{
        let valid = await newvalidateRole(req.user.role,["Admin"]);
        if(valid){

            const timeTable = new TimeTable({
                course : course,
                ...timeTableData
            });
            await TimeTable.create(timeTable)
            .then(()=>{
                res.status(201).send("Time table created");
            })
            .catch((error)=>{
                res.status(400).send("Time table not created");
            })

        }else{
            res.status(401).json({errorMessage:"User not allowed to access requested resource"});
        }
    }catch(error){
        res.status(500).json({message: "Server error: "+error.message});
    }
}

const updateTimeTable = async(req,res)=>{
    const {
        course,
        timeTableData
    } = req.body;

    const updateData = {... timeTableData};

    try{
        let valid = await newvalidateRole(req.user.role,["Admin"]);
        if(valid){
            //updating
            const update = await TimeTable.findByIdAndUpdate(req.params.id,updateData, {new: true});
            if(update){
                res.status(200).json({sucessMessege: "Updated Sucessfully"});
            }else{
                res.status(400).json({errorMessage: "Update failed"});
            }
        }else{
            res.status(401).json({errorMessage:"User not allowed to access requested resource"});
        }
    }catch(error){
        res.status(500).json({message: "Server error: "+error.message});
    }
}

const viewTimeTable = async(req,res)=>{
    try{
        let valid = await newvalidateRole(req.user.role,["Student"]);
        if(valid){
            //checking enrolled
            //Here course id is passed from params.
            const enrolled = await Enroll.find({
                $and: [
                    {course: req.params.id},
                    {student: req.user._id},
                    {status: "Approved"}
                ]
            });

            if(enrolled){
                const timeTable = await TimeTable.findOne({
                    course: req.params.id
                })
                .populate({path: "course", select: {courseName: 1}})
                .populate({path: "monday teuseday wednessday thurseday friday saturday sunday", populate:{path : "location", select:{locationName: 1}}, select:{sessionName: 1,time: 1,endtime: 1}})

                if(timeTable){
                    res.status(200).send(timeTable);
                }else{
                    res.status(400).json({errorMessage: "Error while retriving timetable"});
                }
            }else{
                res.status(400).json({errorMessage: "Should be enrolled and approved to view timetable"});
            }
        }else{
            res.status(401).json({errorMessage:"User not allowed to access requested resource"});
        }

    }catch(error){
        res.status(500).json({message: "Server error: "+error.message});
    }
}

module.exports = {
    createTimeTable,
    updateTimeTable,
    viewTimeTable
}