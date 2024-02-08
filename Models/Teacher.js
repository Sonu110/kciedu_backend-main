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
     Email: {
          type: String,
          required: true,

      },
      password: {
        type: String,
        required: true,
    
    },
Mobile: {
      type: String,
      required: true,
  
  },
   
  isAdmin: {
    type: Boolean,
    default: false,
  },
  
     
        visitHistory: [{ timestamp: { type: Number } }],
      },
      { timestamps: true }
)





const Teachers = mongoose.model("Teachers", Teacher);

module.exports = Teachers;
