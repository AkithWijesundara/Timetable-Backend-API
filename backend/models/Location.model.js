const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const locationSchema = new Schema(
    {
        locationName: {
            type: String,
            required: true,
        },

        capacity: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }

)

const Location = mongoose.model("Location",locationSchema);

module.exports = Location;