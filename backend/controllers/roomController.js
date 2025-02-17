const Room = require("../models/Room.model");
const { newvalidateRole } = require("./exports/validateRole");

//create room

const createRoom =  async(req,res)=>{

    const {
        roomNo,
        type,
        capacity,
        resources,
        bookings
    } = req.body

    try{
        let valid = await newvalidateRole(req.user.role,["Admin"]);
        if(valid){
            const room = await Room.create(
                {
                    roomNo,
                    type,
                    capacity,
                    resources,
                    bookings
                }
            )

            if(room){
                res.status(201).send("Room Created");
            }else{
                res.status(400).json({errorMessage:"Room not created"});
            }
        }else{
            res.status(401).json({errorMessage:"User not allowed to access requested resource"});
        }
    }catch(error){
        res.status(500).json({message: "Server error: "+error.message});
    }
}

module.exports = {
    createRoom
}