import { Router } from 'express';
import timeKeepingApicontroller from "./../controllers/timekeepingController/timeKeepingApiController.js";

const router = Router();


router.post('/register', (req, res) => {
    timeKeepingApicontroller.registerTimekeeping(req, res);
  }

);

router.get('/today', (req, res) => {
    timeKeepingApicontroller.getUserByTimeKeeping(req, res);
  }

);
export default router;