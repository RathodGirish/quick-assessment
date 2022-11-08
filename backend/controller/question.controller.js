const jwt = require('jsonwebtoken')
const QUESTION_COLLECTION = require('../module/question.module');
const commonService = require("../common/common");
const CONSTANT = require('../common/constant');

/*
TODO: POST
Topic: Create Question
*/

exports.createQuestion = (req, res) => {
    const questionStatement = req.body.questionStatement
    const testType = req.body.testType
    const level = req.body.level
    const topicArea = req.body.topicArea
    const questionType = req.body.questionType
    const option = req.body.option
    const tag = req.body.tag
    const requiredTime = req.body.requiredTime
    const answer = req.body.answer
    const subQuestionType = req.body.subQuestionType   
    if (!questionStatement || !testType || !level || !topicArea || !questionType || !requiredTime || !answer || !subQuestionType) {
        res.json({ status: CONSTANT.FAIL, message: CONSTANT.MESSAGE.REQUIRED_FIELDS_MISSING });
    } else {
        const questionObj = {
            questionStatement: questionStatement,
            testType: testType,
            level: level,
            topicArea: topicArea,
            questionType: questionType,
            option: option,
            tag: tag,
            requiredTime: requiredTime,
            answer: answer,
            subQuestionType: subQuestionType,
            isDeleted: false
        };
        QUESTION_COLLECTION.create(questionObj, function (err, result) {
            if (err) {
                res.json({ status: CONSTANT.FAIL, message: "", err: err });
            } else {
                res.json({
                    status: CONSTANT.SUCCESS,
                    message: CONSTANT.COLLECTION.QUESTION + CONSTANT.MESSAGE.ADDED_SUCCESSFULLY,
                    data: result
                });
            }
        })
    }
}

/*
TODO: POST
Topic: update question by id
*/
exports.updateQuestionById = (req, res) => {  
    const questionStatement = req.body.questionStatement;
    const testType = req.body.testType;
    const level = req.body.level;
    const topicArea = req.body.topicArea;
    const questionType = req.body.questionType;
    const option = req.body.option;
    const tag = req.body.tag;
    const requiredTime = req.body.requiredTime;
    const answer = req.body.answer;
    const subQuestionType = req.body.subQuestionType;
    const Id = req.params.id;
    if (!commonService.isValidObjId(Id)) {
        return res.send({
            status: CONSTANT.FAIL,
            message: CONSTANT.COLLECTION.QUESTION + CONSTANT.MESSAGE.NOT_FOUND_BY_ID
        });
    }  else {
            const questionObj = {
                questionStatement: questionStatement,
                testType: testType,
                level: level,
                topicArea: topicArea,
                questionType: questionType,
                option: option,
                tag: tag,
                requiredTime: requiredTime,
                answer: answer,
                subQuestionType: subQuestionType,
                isDeleted: false
            };
            QUESTION_COLLECTION.findByIdAndUpdate(Id, { $set: questionObj }, { new: true }, function (err, result) {
                if (err) {
                    res.send({
                        status: CONSTANT.ERROR,
                        message: err
                    });
                }
                res.send({
                    status: CONSTANT.SUCCESS,
                    message: CONSTANT.COLLECTION.QUESTION + CONSTANT.MESSAGE.IS_UPDATED_SUCCESSFULLY,
                    data: result
                });
            });
        }
}

/*
TODO: GET
Topic: get question by id
*/

exports.getQuestionById = (req, res) => {
    const Id = req.params.id;
    if (!commonService.isValidObjId(Id)) {
        return res.send({
            status: CONSTANT.FAIL,
            message: CONSTANT.COLLECTION.QUESTION + CONSTANT.MESSAGE.NOT_FOUND_BY_ID
        });
    } else {
        QUESTION_COLLECTION.findById(Id)
            .then(questions => {
                if (questions) {
                    res.send({
                        status: CONSTANT.SUCCESS,
                        message: CONSTANT.MESSAGE.DATA_FOUND,
                        data: questions
                    });
                } else {
                    return res.send({
                        status: CONSTANT.FAIL,
                        message: CONSTANT.MESSAGE.DATA_NOT_FOUND
                    });
                }
            })
    }
}
/*
TODO: GET
Topic: get all questions
*/
exports.findAllQuestions = (req, res) => {
    const limit = (req.body.limit) ? req.body.limit : 10;
    const pageCount = (req.body.pageCount) ? req.body.pageCount : 0;
    var skip = (limit * pageCount);   
    var totalRecords = 0;
    QUESTION_COLLECTION.countDocuments({ isDeleted: false },{}).lean().exec(function(err, count) {
        totalRecords = count;
        QUESTION_COLLECTION.find({ isDeleted: false },{ "_id": 1, "questionStatement": 1, "level" : 1, "questionType" : 1  }).sort({ name: 1 }).skip(skip).limit(limit).lean().exec(function(questionsOperatorError, questions_operators) {
            if (questionsOperatorError || !questions_operators) {
                res.json({
                    status: CONSTANT.FAIL,
                    message: CONSTANT.COLLECTION.USER + CONSTANT.MESSAGE.NOT_FOUND
                });
            } else {
                res.json({
                    status: CONSTANT.SUCCESS,
                    message: { 'message': 'Questions Data found successfully.', questions_operators, questions_operators, 'totalRecords': totalRecords }
                });
            }
        })
    })

}

/*
TODO: POST
Topic: delete questions by id
*/

exports.deleteQuestionById = (req, res) => {
    const Id = req.params.id;
    if (!commonService.isValidObjId(Id)) {
        return res.send({
            status: CONSTANT.FAIL,
            message: CONSTANT.COLLECTION.QUESTION + CONSTANT.MESSAGE.NOT_FOUND_BY_ID
        });
    } else {
        QUESTION_COLLECTION.findByIdAndUpdate(Id, { $set: { isDeleted: true } }, { new: true }, function (err, result) {
            if (err) {
                res.send({ status: CONSTANT.ERROR, message: err });
            }
            res.send({
                status: CONSTANT.SUCCESS,
                message: CONSTANT.COLLECTION.QUESTION + CONSTANT.MESSAGE.DELETE_SUCCESSFULLY
            });
        });
    }
};