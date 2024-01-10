import { Router } from 'express';
import userApiController from '../controllers/userController/userApiController.js';
import authController from '../controllers/userController/authController.js';

const router = Router();





router.post('/login', (req, res) => {
    authController.login(req, res);
  });
  
    router.post('/logout', (req, res) => {
      authController.logout(req, res);
    });

router.get('/info', (req, res) => {
    userApiController.getUser(req, res);
  });


  

  export default router;