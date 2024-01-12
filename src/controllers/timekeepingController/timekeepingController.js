import {timekeepingModel} from "../../models/timekeepingModel.js";

const registerTimekeeping = async (userId, registerTime, registerType) => {
    try {
        
        const timekeeping = new timekeepingModel({ userId, registerTime, registerType });
        const timekeepingSaved = await timekeeping.save();
        return timekeepingSaved;
    } catch (e) {
        console.error(e);
        return false;
    }
}

const getallTimekeeping = async () => {
    try {
        const timekeeping = await timekeepingModel.find().exec();
    
        return timekeeping;
    } catch (e) {
        console.error(e);
        return false;
    }
}

const getallTimekeepingByUserId = async (userId) => {
    try {
        const timekeeping = await timekeepingModel.find({ userId }).exec();
    
        return timekeeping;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}

const getallTimekeepingByUserIdAndDate = async (userId, date) => {
    try {
        const timekeeping = await timekeepingModel.find({ userId, date }).exec();
    
        return timekeeping;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}


const getallTimekeepingByUserIdAndDateAndRegisterType = async (userId, date, registerType) => {
    try {
        const timekeeping = await timekeepingModel.find({ userId, date, registerType }).exec();
    
        return timekeeping;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}

const getallTimekeepingByUserIdAndRegisterType = async (userId, registerType) => {
    try {
        const timekeeping = await timekeepingModel.find({ userId, registerType }).exec();
    
        return timekeeping;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}

const getallTimekeepingByUserIdAndDateAndRegisterTime = async (userId, date, registerTime) => {
    try {
        const timekeeping = await timekeepingModel.find({ userId, date, registerTime }).exec();
    
        return timekeeping;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}


const getallTimekeepingByUserIdAndRegisterTime = async (userId, registerTime) => {
    try {
        const timekeeping = await timekeepingModel.find({ userId, registerTime }).exec();
    
        return timekeeping;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}

const getallTimekeepingByDate = async (date) => {
    try {
        const timekeeping = await timekeepingModel.find({ date }).exec();
    
        return timekeeping;
    }
    catch (e) {
        console.error(e);
        return false;
    }

}


export default { registerTimekeeping, getallTimekeeping, getallTimekeepingByUserId, getallTimekeepingByUserIdAndDate, getallTimekeepingByUserIdAndDateAndRegisterType, getallTimekeepingByUserIdAndRegisterType, getallTimekeepingByUserIdAndDateAndRegisterTime, getallTimekeepingByUserIdAndRegisterTime, getallTimekeepingByDate };