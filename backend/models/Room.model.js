const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema(
    {
        roomNo: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            required: true,
        },

        capacity: {
            type: Number,
            required: true,
        },

        resources: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resource",
        }],

        bookings: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
        }],
    },
    {
        timestamps: true,
    }
)

const Room = mongoose.model("Room",roomSchema);

module.exports = Room;