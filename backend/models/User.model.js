const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter first name"],
    },

    lastName: {
      type: String,
      required: [true, "Please enter last name"],
    },

    nic: {
      type: String,
      required: [true, "Please enter NIC"],
    },

    contact: {
      type: Number,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
