const mongoose = require('mongoose')
const Course = new mongoose.Schema({
    
        Name: {
          type: String,
          required: true,
          
        },
       Fees: {
            type: String,
            required: true,

        },
        Duration: {
          type: String,
          required: true,
      
      },
      Descriptions:
      {
        type: String,
        default:''
    
      }
       ,
      Image: {
        type: String,
        required: true,
    
    },
    PDF: {
        type: String,
       default:''
    
    },
     
    
        
      },
      { timestamps: true }
)





const Courses = mongoose.model("Coursedata", Course);

module.exports = Courses;
