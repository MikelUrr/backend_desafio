import userController from "./userController.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";


const updatePassword = async (req,res) => {
    try {
        const {email, password, confirmPassword} = req.body;
        if (password && password !== confirmPassword) {
            return res.status(400).json({ error: "Password and confirmation do not match." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userController.updatePassword(email, hashedPassword)
        
        if(!user){
            res.status(404).json("User does not exist");
            return;
        }
        res.status(200).json("Password updated");
    }
    catch(e){
        console.error(e);
        res.status(500).json("Error updating password");
    }
}

const getUser = async (req,res) => {
    
    if (!req.headers.cookie) {
        res.status(401).json("You need to login");
        return;
    }
    
    // Buscar la cookie llamada "token"
    const tokenCookie = req.headers.cookie
        .split('; ')
        .find(cookie => cookie.startsWith('token='));
    
    if (!tokenCookie) {
        res.status(401).json("Token not found in cookies");
        return;
    }
    const token = tokenCookie.split('=')[1];
   
    try {
        
        if (!token) {
            res.status(401).json("You need to login");
            return;
        }
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        const user = await userController.getUser(decoded.email);
        if (!user) {
            res.status(404).json("User does not exist");
            return;
        }
        res.status(200).json(user);
    } catch (e) {
        console.error(e);
        res.status(500).json("Error getting user");
    }

}

const getIdFromToken = (cookies) => {
    if (!cookies) {
        
        return false;
    }
    
    // Buscar la cookie llamada "token"
    const tokenCookie = cookies
        .split('; ')
        .find(cookie => cookie.startsWith('token='));
    
    if (!tokenCookie) {
       
        return false;
    }
    const token = tokenCookie.split('=')[1];
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
}


const getallUsersActive = async (req,res) => {
    try {
        const users = await userController.getallUsersActive();
        if (!users) {
            res.status(404).json("Users not found");
            return;
        }

  

        res.status(200).json(users);
    } catch (e) {
        console.error(e);
        res.status(500).json("Error getting users");
    }
}



const checkUserByEmail = async (email) => {
    try{
        const user= await userController.getUserByEmail(email);
        
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

const checkIsAdmin = async (id) => {
    try{
        const user = await userController.getUserById(id);
        if(user.userType==="admin"){
            return true;
        }
        return false;
    }
    catch(e){
        console.error(e);
        return false;
    }
}

export default {updatePassword, getUser, getIdFromToken, getallUsersActive, checkIsAdmin, checkUserByEmail};
