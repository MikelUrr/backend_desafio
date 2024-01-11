import mongoose from "mongoose";
import mongodb from "../config/mongodb.js";

const surveyAnswerSchema = new mongoose.Schema({

    surveyId: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String,
    },
    answers: {
        type: String,
    },
    comment: {
        type: String,
    },

});

const surveyAnswerModel  = mongoose.model("surveyAnswer", surveyAnswerSchema);

export default surveyAnswerModel;