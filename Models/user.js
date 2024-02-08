const mongoose = require('mongoose')
const user = new mongoose.Schema({
    
        Name: {
          type: String,
          required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
          type: String,
          required: true,
      
      },
        rolls: {
        type: String,
        required: true,
        default :"user"
        },
        tokens: [
          {
            token: {
              type: String,
              required: true,
            },
          },
        ],

        isAdmin: {
          type: Boolean,
          default: false,
        },

    
        visitHistory: [{ timestamp: { type: Number } }],
      },
      { timestamps: true }
)





const User = mongoose.model("userdata", user);

module.exports = User;
