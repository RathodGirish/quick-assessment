const Question = require('../controller/question.controller')
const express = require("express")
const router = express.Router();
const auth = require("../common/authentication")

router.post("/createQuestion", auth, Question.createQuestion);
router.post('/updateQuestionById/:id', auth, Question.updateQuestionById);
router.post('/findAllQuestionList', auth, Question.findAllQuestions);
router.get('/findAllQuestions', auth, Question.findAllQuestions);
router.get('/getQuestionById/:id',  auth, Question.getQuestionById);
router.post('/deleteQuestionById/:id', auth, Question.deleteQuestionById);

module.exports = router;