import mongoose from "mongoose";
import mongodb from "../config/mongodb.js";



const userSchema = new mongoose.Schema({
    name: {
      type: String,
      
    },
   surname: {
      type: String,
      
    },
    department: {
      type: String,
      
    },
    rol: {
      type: String,
      
    },
    startDate: {
      type: Date,
      
    },
    education: {
      type: String,
      
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
    userActive: {
        type: Boolean,
        default: true,
    },
    userType:{
      type: String,
      default: "user"
    },
    createdAt: {
      type: Date,
      default: Date.now
  },
  firsttLogin: {
    type: Boolean,
    default: true,
  },
  salary: {
    type: Number,
  },
  promotionDate: {
    type: Date,

  },
  gender: {
    type: String,
  },
  birthDate: {
    type: Date,
  },

    });
  
  const userModel = mongoose.model('user', userSchema);
  
 export default userModel;