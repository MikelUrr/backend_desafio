import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import userApiController from '../userController/userApiController.js';



//isLogin function
const isLogin = async (req, res, next) => {
    try {
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
        
        if (!token) {
            res.status(401).json("You need to login");
            return;
        }
        
        const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await userApiController.checkUserByEmail(decoded.email);
        
        if (!user) {
            res.status(404).json("User does not exist");
            return;
        }
        
        // Agrega el usuario decodificado a la solicitud para que pueda ser utilizado en los controladores posteriores
        req.user = decoded;
        next();
    } catch (e) {
        console.error(e);
        res.status(500).json("Error getting user");
    }
};



//isAdmin function

const isAdmin = async (req, res, next) => {
  try {
    const id= await userApiController.getIdFromToken(req.headers.cookie);
    const checkAdmin= await userApiController.checkIsAdmin(id);
    console.log("checkadmin",checkAdmin);
    if (!checkAdmin) {
      res.status(401).json("You need to be admin");
      return;
    }

    next();

}
catch (e) {
  console.error(e);
  res.status(500).json("Error getting user");
}
}

export default {
    isLogin,
    isAdmin
};