const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const facultySchema = new Schema(
    {
        facultyName: {
            type: String,
            required: true,
        },
        dean: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    },
    {
        timestamps: true,
    }
);

const Faculty = mongoose.model("Faculty",facultySchema);

module.exports = Faculty;

