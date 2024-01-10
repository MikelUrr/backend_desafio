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
    const token = req.headers.cookie.split("=")[1]; 
   
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

export default {updatePassword, getUser};