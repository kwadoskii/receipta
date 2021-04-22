const mongoose = require("mongoose");
// const { userSchema } = require("./user");

const receiptSchema = new mongoose.Schema({
  customerName: {
    type: String,
    minLength: 3,
    maxLength: 100,
    required: true,
    trim: true,
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
    required: true,
    trim: true,
  },
  purchaseDate: {
    type: Date,
    default: new Date(),
  },
  receiptNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  items: [
    {
      name: {
        type: String,
        maxLength: 255,
        trim: true,
        required: true,
      },
      unitCost: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  issuer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  __v: { type: Number, select: false },
});

const Receipt = mongoose.model("Receipt", receiptSchema);

exports.Receipt = Receipt;
