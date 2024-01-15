import mongoose from "mongoose";
import mongodb from "../config/mongodb.js";



const timekeepingSchema = new mongoose.Schema({

    userId: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    registerTime: {
        type: String,
    },
    registerType: {
        type: String,
    },
   
});

const timekeepingModel  = mongoose.model("timekeeping", timekeepingSchema);

export {timekeepingModel};

