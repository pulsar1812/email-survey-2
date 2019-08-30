const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecipientSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  responded: {
    type: Boolean,
    default: false
  }
});

module.exports = RecipientSchema;
