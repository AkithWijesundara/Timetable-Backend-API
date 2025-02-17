const Session = require("../models/Session.model");
const Faculty = require("../models/Faculty.model");
const Location = require("../models/Location.model");
const Course = require("../models/Course.model");
const { newvalidateRole } = require("./exports/validateRole");

//Create session

const createSession =  async (req,res)=>{
    
    let courseId;
    let facultyId;
    let locationId;

    const {
        course,
        sessionName,
        time,
        duration,
        faculty,
        location
    } = req.body;


//make sure get course,location,faculty obj id
    try{
        let valid = await newvalidateRole(req.user.role,["Admin"]);
        if(valid){
            let endtime = time+duration

            // let endTime = time+duration;
            // const occupied = await Session.findOne({
            //     $and: [
            //         {location: location},
            //         {endtime: {$gt:time, $lt: endTime}}
            //     ]
            // });
            // if(occupied){
            //     res.status(400).json({errorMessage: "Location not available for specifed time"});
            //     return;
            // }
            

            const session = await Session.create(
                {
                    course,
                    sessionName,
                    time,
                    endtime,
                    duration,
                    faculty,
                    location,
                }
            );
            res.status(201).send("Session added");
        }else{
            res.status(401).json({errorMessage:"User not allowed to access requested resource"});
        }
    }catch(error){
        res.status(500).json({message: "Server error: "+error.message});
    }

}

// update session
const updateSession = async (req,res)=>{
    
    const {
        course,
        sessionName,
        time,
        duration,
        faculty,
        location
    } = req.body;

    try{
        let valid = await newvalidateRole(req.user.role,["Admin"]);
        if(valid){
            let endtime = time+duration;
            // const occupied = await Session.findOne({
            //     $and: [
            //         {location: location},
            //         {endtime: {$gt:time, $lt: endtime}}
            //     ]
            // });
            // if(occupied._id !=req.params.id){
            //     res.status(400).json({errorMessage: "Location not available for specifed time"});
            //     return;
            // }

            const updateData = {
                course,
                sessionName,
                time,
                endtime,
                duration,
                faculty,
                location,
            }

            const update = await Session.findByIdAndUpdate(req.params.id, updateData, {new: true});

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

//delete session

const deleteSession = async(req,res)=>{
    try{
        // validating user allowed for task
        let valid = await newvalidateRole(req.user.role,["Admin"]);
        if(valid){
            const deleted = await Session.findByIdAndDelete(req.params.id);
            if(deleted){
                res.status(200).json({successMessage: "Session Deleted"});
            }else{
                res.status(400).json({errorMessage: "Session Deleting failed"});
            }
        }else{
            res.status(401).json({errorMessage:"User not allowed to access requested resource"});
        }
        

    }catch(error){
        res.status(500).json({message: "Server error: "+error.message});
    }
}
module.exports = {
    createSession,
    updateSession,
    deleteSession
}