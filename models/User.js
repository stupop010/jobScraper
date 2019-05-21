const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  searchs: [
    {
      location: {
        type: String
      },
      jobTitle: {
        type: String
      }
    }
  ],
  registerDate: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("user", UserSchema);
