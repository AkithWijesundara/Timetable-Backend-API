const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const enrollSchema = new Schema(
    {
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },

        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        status: {
            type: String,
            required: true,
            default: "Pending",
        }
    },
    {
        timestamps: true,
    }
)

const Enroll = mongoose.model("Enroll",enrollSchema);

module.exports = Enroll;