import { Router } from 'express';
import emotionApicontroler from '../controllers/emotionController/emotionApicontroler.js';

const router = Router();

router.get('/daily', (req, res) => {
    emotionApicontroler.getDayEmotions(req, res);
  }
);

router.get('/all', (req, res) => {
    emotionApicontroler.getallEmotions(req, res);
  }
);

export default router;