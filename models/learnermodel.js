const mongoose = require("mongoose");

const learnerSchema = mongoose.Schema({
  learnername: {
    required: true,
    type: String,
  },
  college: {
    required: true,
    type: String,
  },
  department: {
    required: true,
    type: String,
  },
  grade:{
    required: true,
    type:String, 
  },
    email: {
        required: true,
        type:String, 
      
  },
   course1:{
        required: true,
        type:String, 
      
   },
   course2:{
    required: false,
    type:String 
  },
  phonenumber:{
    required:true,
    type:Number

  }

});

module.exports = mongoose.model("Learner", learnerSchema);