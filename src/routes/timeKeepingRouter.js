import { Router } from 'express';
import timeKeepingApicontroller from "./../controllers/timekeepingController/timeKeepingApiController.js";
import authmiddleware from '../controllers/middlewares/authmiddleware.js';

const router = Router();


router.post('/register', (req, res) => {
    timeKeepingApicontroller.registerTimekeeping(req, res);
  }

);

router.get('/today',authmiddleware.isAdmin,  (req, res) => {
    timeKeepingApicontroller.getUserByTimeKeeping(req, res);
  }

);
export default router;