const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resourceSchema = new Schema(
    {
        resourceName: {
            type: String,
            required: true,
        } 
    },
    {
        timestamps: true,
    }
)

const Resource = mongoose.model("Resource",resourceSchema);

module.exports = Resource;