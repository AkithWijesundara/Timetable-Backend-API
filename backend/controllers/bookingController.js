const Booking = require("../models/Booking.model");
const Room = require("../models/Room.model");
const { newvalidateRole } = require("./exports/validateRole");

//Create Booking

const createBooking = async(req,res)=>{
    const {
        roomNo,
        event,
        startTime,
        duration
    } = req.body;

    const startTimeDate = new Date(startTime);

    try{
        let valid = await newvalidateRole(req.user.role,["Admin","Faculty"]);
        if(valid){
            const endTimeDate = new Date(startTimeDate.getTime() + duration * 60 * 60 * 1000);
            const occupied = await Booking.findOne({
                $and: [
                    {roomNo: roomNo},
                    {$or: [
                        {startTime: {$gte:startTimeDate, $lt: endTimeDate}},
                        {endTime: {$gt:startTimeDate, $lte: endTimeDate}}
                    ]}
                ]
            });

            if(occupied){
                res.status(400).json({errorMessage: "Room not available for specifed time"});
                return;
            }

            const booking =  await Booking.create(
                {
                    roomNo,
                    event,
                    startTime: startTimeDate,
                    endTime: endTimeDate,
                    duration
                }
            )

            if(booking){
                const bookingList = await Room.findById(roomNo);
                bookingList.bookings.push(booking._id);
                await Room.findByIdAndUpdate(roomNo,{bookings: bookingList.bookings});

                res.status(201).send("Booking created");
            }else{
                res.status(400).send("Booking failed");
            }
            
            
        }else{
            res.status(401).json({errorMessage:"User not allowed to access requested resource"});
        }

    }catch(error){
        res.status(500).json({message: "Server error: "+error.message});
    }
}

module.exports = {
    createBooking
}