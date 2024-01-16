//surveyRouter.js

import { Router } from 'express';
import surveyController from '../controllers/surveys/surveyController.js';
import authmiddleware from '../controllers/middlewares/authmiddleware.js';

const router = Router();

router.post('/create', (req, res) => {
    surveyController.createApiSurveyAnswer(req, res);
  }
);

export default router;