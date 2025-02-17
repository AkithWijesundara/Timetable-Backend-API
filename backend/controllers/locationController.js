const Location = require("../models/Location.model");
const { newvalidateRole } = require("./exports/validateRole");


//Create locations

const createLocation = async(req,res)=>{

    const {
        locationName,
        capacity,
    } = req.body;

    try{
        let valid = await newvalidateRole(req.user.role, ["Admin","Faculty"]);
        if(valid){
            const existingLocation = await Location.findOne({locationName: locationName});

            if(existingLocation){
                res.status(400).json({error: "Location exist"});
                return;
            }

            const location = await Location.create(
                {
                    locationName,
                    capacity,
                }
            );

            res.status(201).send("Location Added");

        }else{
            res.status(401).json({errorMessage:"User not allowed to access requested resource"});
        }
    }catch(error){
        res.status(500).json({message: "Server error: "+error.message});
    }
}

module.exports = {
    createLocation
}