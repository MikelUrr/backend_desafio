import mongoose from "mongoose";
import mongodb from "../config/mongodb.js";



const surveySchema = new mongoose.Schema({
    surveyType: {
        type: String,
    },
  

});

const surveyModel  = mongoose.model("survey", surveySchema);