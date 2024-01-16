import { Router } from 'express';
import userRouter from "./userRouter.js"
import emotionRouter from "./emotionRouter.js"
import timeKeepingRouter from "./timeKeepingRouter.js"
import authmiddleware from '../controllers/middlewares/authmiddleware.js';



const router = Router();

router.use ('/user', userRouter);
router.use ('/emotion', emotionRouter);
router.use ('/time', timeKeepingRouter);


export default router;