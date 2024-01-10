import mongoose from "mongoose";
import mongodb from "../config/mongodb.js";



const emotionSchema = new mongoose.Schema({
emotionType: {
      type: String,
    },
date: {
      type: Date,
      default: Date.now
  },
  userId: {
    type: String,
  },
  registerTime: {
    type: String,
  },
  
});

const emotionModel  = mongoose.model("emotion", emotionSchema);


export default emotionModel;