import { Router } from 'express';
import userRouter from "./userRouter.js"
import emotionRouter from "./emotionRouter.js"



const router = Router();

router.use ('/user', userRouter);
router.use ('/emotion', emotionRouter);






export default router;