const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    // requuired: true
  },

  fullname: {
    type: String,
    // required: true,
    trim: true
  },

  dateofRegistration: {
    type: Date,
    // required: true,
  },

  dateofbirth: {
    type: Date,
    // required: true
  },

  gender: {
    type: String,
  },

  activitiesUndertaken: {
    type: String,
    // required: true,
  },

  residentType: {
    type: String,
  },

  direction: {
    type: String,
  },

  contact: {
    type: Number,
    // required: true
  },

  nin: {
    type: String,
    // required: true,
    trim: true
  },

  password: {
    type: String,
    // required: true
  },

  ward: {
    type: String,
    // required: true
  },
  userid: {
    type: String
    // required: true
  }


});

userSchema.plugin(passportLocalMongoose, {
  usernameField: "userid"
});

module.exports = mongoose.model("Registration", userSchema);