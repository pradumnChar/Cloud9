const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  
    username: {
    type: String,
    required: true,
    min: 3,
    max: 50,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },

  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  
  avatarImage: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("Users", userSchema);

//Pradumn 
