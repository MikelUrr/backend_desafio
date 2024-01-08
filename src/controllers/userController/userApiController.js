import userController from "./userController.js";

import bcrypt from "bcrypt";


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

export default updatePassword;