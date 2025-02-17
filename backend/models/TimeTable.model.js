const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const timeTableSchema = new Schema(
    {
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

        monday: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Session",
        }],
        teuseday: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Session",
        }],
        wednessday: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Session",
        }],
        thurseday: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Session",
        }],
        friday: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Session",
        }],
        saturday: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Session",
        }],
        sunday: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Session",
        }],
    }
)

const TimeTable = mongoose.model("TimeTable",timeTableSchema);

module.exports = TimeTable;