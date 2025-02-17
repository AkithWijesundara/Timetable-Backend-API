const Resource = require("../models/Resource.model");
const { newvalidateRole } = require("./exports/validateRole");

//create resource 

const createResource = async (req,res)=>{
    const {
        resourceName
    } = req.body;

    try{
        let valid = await newvalidateRole(req.user.role, ["Admin","Faculty"]);
        if(valid){
            const existingResource = await Resource.findOne({resourceName: resourceName});
            if(existingResource){
                res.status(400).json({errorMessage: "Resource exist"});
                return;
            }

            const resource = await Resource.create(
                {
                    resourceName
                }
            );

            res.status(201).send("Resource Added");

        }else{
            res.status(401).json({errorMessage:"User not allowed to access requested resource"});
        }

    }catch(error){
        res.status(500).json({message: "Server error: "+error.message});
    }
}

module.exports = {
    createResource
}