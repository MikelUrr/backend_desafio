//surveyController.js
import surveyAnswerModel from '../../models/surveyAnswerModel.js';

const createSurveyAnswer = async (surveyAnswer) => {
    try {
        const newSurveyAnswer = new surveyAnswerModel(surveyAnswer);
        await newSurveyAnswer.save();
        return true;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}

//surveyApiController.js

const createApiSurveyAnswer = async (req, res) => {
    try {
        const { surveyId, title, answers } = req.body;
        const surveyAnswer = { surveyId, title, answers };
        console.log(surveyAnswer);
        const surveyAnswerSaved = await createSurveyAnswer(surveyAnswer);
        if (!surveyAnswerSaved) {
            res.status(500).json("Error saving surveyAnswer");
            return;
        }
        res.status(201).json("SurveyAnswer saved");
    } catch (e) {
        console.error(e);
        res.status(500).json("Saving surveyAnswer failed");
    }
}

export default { createSurveyAnswer, createApiSurveyAnswer };
