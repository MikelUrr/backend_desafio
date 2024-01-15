import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import userApiController from '../userController/userApiController.js';



//isLogin function
const isLogin = (req, res, next) => {
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
        const user = userApiController.getUser(decoded.email);
        if (!user) {
            res.status(404).json("User does not exist");
            return;
        }
        next();
    } catch (e) {
        console.error(e);
        res.status(500).json("Error getting user");
    }
}


//isAdmin function

const isAdmin = async (req, res, next) => {
    const id = getIdFromToken(req.headers.cookie);
    if (!id) {
        res.status(401).json("You need to login");
        return;
    }
    const user = await userApiController.getUser(id);
    if (!user) {
        res.status(404).json("User does not exist");
        return;
    }
    if (user.userType === "user") {
        res.status(403).json("You are not authorized");
        return;
    }
    next();
}

export default {
    isLogin,
    isAdmin
};