const mongoose = require("mongoose");

const organisationSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 100,
  },
  address: {
    line1: { type: String, maxLength: 30, trim: true },
    line2: { type: String, maxLength: 30, trim: true },
    state: { type: String, maxLength: 30, trim: true },
    country: { type: String, maxLength: 30, trim: true },
  },
  phone: {
    type: String,
    minLength: 8,
    maxLength: 14,
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
    trim: true,
  },
  website: {
    type: String,
    required: true,
    maxLength: 255,
    trim: true,
  },
  motto: {
    type: String,
    maxLength: 50,
    trim: true,
  },
  rcNumber: {
    type: String,
    maxLength: 7,
  },
  logo: {
    type: String,
  },
  __v: { type: Number, select: false },
});

const Organisation = mongoose.model("Organisation", organisationSchema);

exports.Organisation = Organisation;
