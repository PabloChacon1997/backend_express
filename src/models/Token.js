const mongoose = require("mongoose");


const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: "1d"
  }
});

const Token = mongoose.model('Token', TokenSchema);
module.exports = Token;