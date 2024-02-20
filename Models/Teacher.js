const mongoose = require('mongoose')
const Teacher = new mongoose.Schema({
    
   Image: {
     type: String,
     required: true,
 
 },
    Name: {
        type: String,
        required: true,
        
      },
      knowledge:
      {
        type: String,
        required: true,
      },
   
    Mobile: {
      type: Number,
      required: true,
  
  },
  Gender: {
    type: String,
    default :"male"
  },

  Branch: {
    type: String,
    default :'Roshan',
  },
  Salary: {
    type: Number,
    required: true
  },
  Joindate: {
    type: String,
    default :''
  },
  dob: {
    type: String,
    default :''
  },

  Address: {
    type: String,
    default :'',
    required:true
  },


  
   
     
       
      },
      { timestamps: true }
)





const Teachers = mongoose.model("Teachers", Teacher);

module.exports = Teachers;
