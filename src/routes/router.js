import { Router } from 'express';
import userRouter from "./userRouter.js"
import emotionRouter from "./emotionRouter.js"
import timeKeepingRouter from "./timeKeepingRouter.js"
import authmiddleware from '../controllers/middlewares/authmiddleware.js';



const router = Router();

router.use ('/user', userRouter);
router.use ('/emotion',authmiddleware.isLogin, emotionRouter);
router.use ('/time',authmiddleware.isLogin, timeKeepingRouter);


export default router;