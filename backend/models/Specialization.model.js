const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const specializationSchema = new Schema(
    {
        specializationName: {
            type: String,
            required: true,
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

const Specialization = mongoose.model("Specialization",specializationSchema);
module.exports = Specialization;