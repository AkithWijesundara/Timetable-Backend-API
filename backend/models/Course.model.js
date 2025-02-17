const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema(
    {
        courseName: {
            type: String,
            required: true,
        },

        code: {
            type: String,
            requried: true,
        },

        description: {
            type: String,
            required: true,
        },

        credits: {
            type: Number,
            requried: true,
        },

        faculty: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Faculty",
        }
    },
    {
        timestamps: true,
    }
);

const Course = mongoose.model("Course",courseSchema);

module.exports = Course;