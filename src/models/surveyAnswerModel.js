import mongoose from "mongoose";
import mongodb from "../config/mongodb.js";

const surveyAnswerSchema = new mongoose.Schema({

    surveyId: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
    },
    answers: {
        type: Array,
    },

});

const surveyAnswerModel  = mongoose.model("surveyAnswer", surveyAnswerSchema);

export default surveyAnswerModel;