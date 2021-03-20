const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 40,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 40,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  __v: { type: Number, select: false },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this.id, isAdmin: this.isAdmin, email: this.email },
    process.env.JWT_SIGN,
    {
      expiresIn: 60 * 30,
    }
  );
};

const User = mongoose.model("User", userSchema);

exports.User = User;
