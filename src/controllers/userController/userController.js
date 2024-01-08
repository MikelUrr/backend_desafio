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
export default updatePassword;

