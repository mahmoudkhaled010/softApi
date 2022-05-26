const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  coursetitle: {
    required: true,
    type: String,
  },
  courseduration: {
    required: true,
    type: String,
  },
  courceprice: {
    required: true,
    type: String,
  },
  coachname: {
    required: true,
    type: String,
  },
  coachemail: {
    required: true,
    type:String 
  }

});

module.exports = mongoose.model("postData", postSchema);