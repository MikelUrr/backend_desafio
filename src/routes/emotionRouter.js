import { Router } from 'express';
import emotionApicontroler from '../controllers/emotionController/emotionApicontroler.js';
import authmiddleware from '../controllers/middlewares/authmiddleware.js';

const router = Router();

router.get('/daily',authmiddleware.isAdmin, (req, res) => {
    emotionApicontroler.getDayEmotions(req, res);
  }
);

router.get('/all',authmiddleware.isAdmin, (req, res) => {
    emotionApicontroler.getallEmotions(req, res);
  }
);

router.post('/delete', (req, res) => {
    emotionApicontroler.removeAllEmotions(req, res);
  }
);

export default router;