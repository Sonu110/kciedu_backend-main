const mongoose = require('mongoose')
const Student = new mongoose.Schema({
    
    firstname: {
        type: String,
        required: true,
    
    },
    lastname:
    {
        type: String,
       
    
    },
    course:
    {
        type:String,
        required: true,
    },
    Mobilenumber: {
      type: String,
      required: true,
    
    },
    confirmnumber:
    {
        type:String,
       
    },


    Email: {
        type: String,
        required: true,
        unique: true
      },
      Date_of_brith: {
        type: String,
        required: true,
      
      },
      Gender: {
        type: String,
        default :"male"
      },
    
      Occupation: {
        type: String,
      },

      State: {
        type: String,
      },
      City: {
        type: String,
      },
      Postcode:
      {
        type: String,
      },
      Address:
      {
        type: String,
      },
    


    photo: {
        type: String,
      
        
    },
    
      StudentID: {
          type: Number,
          default: '',

      },
    username: {
        type: String,
        required: true,
        unique: true
    
    },
    Status: {
      type: Boolean,
      default: true,
  },
  Admission_date: {
      type: String,
      default: '',
  },
  password: {
      type: String,
      default: '',
  },


  Student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userdata",
    required: true,
  },




      },
      { timestamps: true }
)





const Students = mongoose.model("Newstudents", Student);

module.exports = Students;
