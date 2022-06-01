const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: "string",
    required: true,
  },
  firstName: {
    type: "string",
    minLength: 3,
    required: true,
  },
  lastName: {
    type: "string",
    minLength: 1,
    required: true,
  },
  password: {
    type: "string",
    required: true,
    minLength: 5,
  },
  type: {
    type: "string",
    enum: ["admin", "manager", "employee"],
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
