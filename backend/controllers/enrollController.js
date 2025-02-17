const Enroll = require("../models/Enroll.model");
const { newvalidateRole } = require("./exports/validateRole");

//Enroll student

const enrollStudent = async(req,res)=>{

    const {
        course,
        student
    } = req.body;

    try{
        let valid = await newvalidateRole(req.user.role,["Student"]);
        if(valid){
            const enroll = await Enroll.create(
                {
                    course,
                    student
                }
            );
            if(enroll){
                res.status(201).json({successMessage: "Enroll successfull, Request sent."});
            }else{
                res.status(400).json({errorMessage:"Enroll Unsuccessfull"});
            }

        }else{
            res.status(401).json({errorMessage:"User not allowed to access requested resource"});
        }
    }catch(error){
        res.status(500).json({message: "Server error: "+error.message});
    }
}

const viewEnrollments =  async(req,res)=>{

    try{
        let valid = await newvalidateRole(req.user.role,["Admin","Faculty"]);
        if(valid){
            const enrollments= await Enroll.find()
            .populate({ path: "course", select: { coursName: 1} })
            .populate({ path: "student", select: {firstName: 1, lastName:1}})
            .exec();

            if(enrollments){
                res.status(200).send(enrollments);
            }else{
                res.status(400).json({errorMessage: "Could not get enrollments"});
            }
        }else{
            res.status(401).json({errorMessage:"User not allowed to access requested resource"});
        }

    }catch(error){
        res.status(500).json({message: "Server error: "+error.message});
    }
}

const manageEnrollments= async(req,res)=>{
    const {
        status
    } = req.body;

    const updateData = {
        status
    };

    try{
        let valid = await newvalidateRole(req.user.role,["Admin","Faculty"]);
        if(valid){
            const update = await Enroll.findByIdAndUpdate(req.params.id,updateData, {new: true});

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

module.exports = {
    enrollStudent,
    viewEnrollments,
    manageEnrollments
}