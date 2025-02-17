const  Specialization = require("../models/Specialization.model");
const { newvalidateRole } = require("./exports/validateRole");

//Create specialization

const createSpecialization =async(req,res)=>{
    const {
        specializationName,
        faculty
    } = req.body;

    try{
        let valid = await newvalidateRole(req.user.role,["Admin"]);
        if(valid){
            const existingSpecialization = await Specialization.findOne({specializationName:specializationName});

            if(existingSpecialization){
                res.status(400).json({errorMessage: "Specialization exits"});
                return;
            }

            const specialization = await Specialization.create(
                {
                    specializationName,
                    faculty
                }
            );

            if(specialization){
                res.status(201).send("Specialization created");
            }
            
        }else{
            res.status(401).json({errorMessage:"User not allowed to access requested resource"});
        }
    }catch(error){
        res.status(500).json({message: "Server error: "+error.message});
    }
}

module.exports = {
    createSpecialization
}