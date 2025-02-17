const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionSchema = new Schema(
    {
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },

        sessionName: {
            type: String,
            required: true,
        },

        time: {
            type: Number,
            required: true,
        },

        endtime: {
            type: Number,
            required: true,
        },

        duration: {
            type: Number,
            required: true,
        },

        faculty: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Faculty",
        },

        location: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Location",
        }

    },
    {
        timestamps: true,
    }
)

const Session = mongoose.model("Session",sessionSchema);

module.exports = Session;