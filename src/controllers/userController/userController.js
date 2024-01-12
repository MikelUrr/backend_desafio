import UserModel from "../../models/userModel.js"

const updatePassword = async (email, password) => {
    try {
    const user= UserModel.findOne({email});
    if(!user){
        return false;
    }
    user.password=password;
    user.firstLogin=false;
    await user.save();
    return true;
    }
    catch(e){
        console.error(e);
        return false;
    }
}

const createUser = async (user) => {
    try {
        const newUser = new UserModel(user);


        
        await newUser.save();
        return true;
    }
    catch(e){
        console.error(e);
        return false;
    }
}

const getUser = async (email) => {
    
    try {
        const user= UserModel.findOne({email});
        if(!user){
            return false;
        }
        return user;
    }
    catch(e){
        console.error(e);
        return false;
    }
}

const getallUsers = async () => {
    try {
        const users = await UserModel.find().exec();
    
        return users;
    } catch (e) {
        console.error(e);
        return false;
    }
}

const getallUsersActive = async () => {
    try {
        const users = await UserModel.find({userActive:true}).exec();
    
        return users;
    } catch (e) {
        console.error(e);
        return false;
    }
}


export default {updatePassword, createUser, getUser, getallUsers, getallUsersActive};

