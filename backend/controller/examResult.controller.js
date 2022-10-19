const jwt = require("jsonwebtoken");
const EXAM_RESULT_COLLECTION = require("../module/examResult.module");
const commonService = require("../common/common");
const CONSTANT = require("../common/constant");
// const fs = require('fs');


/*
TODO: POST
Topic: create Exam Result 
*/

exports.createExamResult = (req, res) => {
    const userId = req.body.userId;
    const retakeDate = req.body.retakeDate;
    const timeTaken = req.body.timeTaken;
    const examId = req.body.examId;
    const examName = req.body.examName;
    const rightAns = req.body.rightAns;
    const wrongAns = req.body.wrongAns;
    const ansGiven = req.body.ansGiven;
    const totalMarks = req.body.totalMarks;
    const totalMarksObtained = req.body.totalMarksObtained;
    const totalAnsCount = req.body.totalAnsCount;
    {
        if (!userId || !retakeDate || !timeTaken || !examId || !examName || !rightAns || !wrongAns || !ansGiven || !totalMarks || !totalMarksObtained || !totalAnsCount) {
            res.json({
                status: CONSTANT.FAIL,
                message: CONSTANT.MESSAGE.REQUIRED_FIELDS_MISSING
            });
        } else {
            const ExamResultObj = {
                userId: userId,
                retakeDate: retakeDate,
                timeTaken: timeTaken,
                examId: examId,
                examName: examName,
                rightAns: rightAns,
                wrongAns: wrongAns,
                ansGiven: ansGiven,
                totalMarks: totalMarks,
                totalMarksObtained: totalMarksObtained,
                totalAnsCount: totalAnsCount,
                isDeleted: false
            };
            EXAM_RESULT_COLLECTION.create(ExamResultObj, function (err, result) {
                if (err) {
                    res.json({ status: CONSTANT.FAIL, message: "", err: err });
                } else {
                    res.json({ 
                        status: CONSTANT.SUCCESS, 
                        message: CONSTANT.COLLECTION.EXAM_RESULT + CONSTANT.MESSAGE.ADDED_SUCCESSFULLY, 
                        data: result 
                    });
                }
            });
        }
    }
}

/*
TODO: POST
Topic: Update Exam Result by id
*/

exports.updateExamResultById = (req, res) => {
    const userId = req.body.userId;
    const retakeDate = req.body.retakeDate;
    const timeTaken = req.body.timeTaken;
    const examId = req.body.examId;
    const examName = req.body.examName;
    const rightAns = req.body.rightAns;
    const wrongAns = req.body.wrongAns;
    const ansGiven = req.body.ansGiven;
    const totalMarks = req.body.totalMarks;
    const totalMarksObtained = req.body.totalMarksObtained;
    const totalAnsCount = req.body.totalAnsCount;
    const Id = req.params.id;
    if (!commonService.isValidObjId(Id)) {
        return res.send({
            status: CONSTANT.FAIL,
            message: CONSTANT.COLLECTION.EXAM_RESULT + CONSTANT.MESSAGE.NOT_FOUND_BY_ID
        });
    }
    else {
        const ExamResultObj = {
            userId: userId,
            retakeDate: retakeDate,
            timeTaken: timeTaken,
            examId: examId,
            examName: examName,
            rightAns: rightAns,
            wrongAns: wrongAns,
            ansGiven: ansGiven,
            totalMarks: totalMarks,
            totalMarksObtained: totalMarksObtained,
            totalAnsCount: totalAnsCount,
            isDeleted: false
        };

        EXAM_RESULT_COLLECTION.findByIdAndUpdate(Id, {
            $set: ExamResultObj
        }, { new: true },
            function (err, result) {
                if (err) {
                    res.send({
                        status: CONSTANT.ERROR,
                        message: err
                    });
                } else {
                    res.send({
                        status: CONSTANT.SUCCESS,
                        message: CONSTANT.COLLECTION.EXAM_RESULT + CONSTANT.MESSAGE.IS_UPDATED_SUCCESSFULLY,
                        data: result
                    });
                }
            });
    }
}

/*
TODO: GET
Topic: get Exam Reslut by id
*/

exports.getExamResultById = (req, res) => {
    const Id = req.params.id;
    if (!commonService.isValidObjId(Id)) {
        return res.send({
            status: CONSTANT.FAIL,
            message: CONSTANT.COLLECTION.EXAM_RESULT + CONSTANT.MESSAGE.NOT_FOUND_BY_ID
        });
    } else {
        EXAM_RESULT_COLLECTION.findById(Id)
            .then(ExamResult => {
                console.log("DFDF", ExamResult)
                if (ExamResult) {
                    res.send({
                        status: CONSTANT.SUCCESS,
                        message: CONSTANT.MESSAGE.DATA_FOUND,
                        data: ExamResult
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
Topic: get all exam result
*/

exports.getAllExamResult = function (req, res) {
    const limit = (req.body.limit) ? req.body.limit : 2;
    const pageCount = (req.body.pageCount) ? req.body.pageCount : 0;
    var skip = (limit * pageCount);
    console.log("skip",skip)
    var totalRecords = 0;
    EXAM_RESULT_COLLECTION.countDocuments({ isDeleted: false },{}).lean().exec(function(err, count) {
        totalRecords = count;
        EXAM_RESULT_COLLECTION.find({ isDeleted: false },{}).sort({ name: 1 }).skip(skip).limit(limit).lean().exec(function(examResultOperatorError, examResult_operators) {
            if (examResultOperatorError || !examResult_operators) {
                res.json({
                    status: CONSTANT.FAIL,
                    message: CONSTANT.COLLECTION.USER + CONSTANT.MESSAGE.NOT_FOUND
                });
            } else {
                res.json({
                    status: CONSTANT.SUCCESS,
                    message: { 'message': 'Exam Result Data found successfully.', 'examResult_operators': examResult_operators, 'totalRecords': totalRecords }
                });
            }
        })
    })
};

/*

TODO: POST
Topic: delete exam result by id
*/

exports.deleteExamResultById = (req, res) => {
    const Id = req.params.id;
    if (!commonService.isValidObjId(Id)) {
        return res.send({
            status: CONSTANT.FAIL,
            message: CONSTANT.COLLECTION.EXAM_RESULT + CONSTANT.MESSAGE.NOT_FOUND_BY_ID
        });
    } else {
        EXAM_RESULT_COLLECTION.findByIdAndUpdate(Id,
            { $set: { isDeleted: true } },
            { new: true },
            function (err, result) {
                if (err) {
                    res.send({
                        status: CONSTANT.ERROR,
                        message: err
                    });
                }
                res.send({
                    status: CONSTANT.SUCCESS,
                    message: CONSTANT.COLLECTION.EXAM_RESULT + CONSTANT.MESSAGE.DELETE_SUCCESSFULLY
                });
            });
    }
}