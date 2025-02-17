const Faculty = require("../models/Faculty.model");
const User = require("../models/User.model");


const createFaculty = async(req,res)=>{
    const {
        facultyName,
        userName,
    } = req.body;

    const deanId = await User.findOne({userName: userName}).select("_id");

    if(deanId == null){
        res.status(400).json({errorMessage: "User dosnt exist for given username"});
    }

    try{
        const faculty = await Faculty.create(
            {
                facultyName,
                dean: deanId,
            }
        );

        res.status(201).send("Faculty Added");
    }catch(error){
        res.status(500).json({message: "Server error: "+error.message});
    }


};

module.exports = {createFaculty}