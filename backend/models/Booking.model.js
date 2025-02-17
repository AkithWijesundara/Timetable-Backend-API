const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
    {

        roomNo:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },

        event: {
            type: String,
            required: true,
        },
        
        startTime: {
            type: Date,
            required: true,
        },

        endTime: {
            type: Date,
            required: true,
        },

        duration: {
            type: Number,
            required: true,
        } 
    },
    {
        timestamps: true,
    }
)

const Booking = mongoose.model("Booking",bookingSchema);

module.exports = Booking;