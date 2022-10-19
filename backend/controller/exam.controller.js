const EXAM_COLLECTION = require('../module/exam.module')
const commonService = require("../common/common");
const CONSTANT = require('../common/constant')


/*
TODO: POST
Topic: Add ExamDetails
*/

exports.addExamDetails = (req, res) => {
    const topicArea = req.body.topicArea;
    const examTitle = req.body.examTitle;
    const examType = req.body.examType;
    const easyQuestion = req.body.easyQuestion;
    const mediumQuestion = req.body.mediumQuestion;
    const hardQuestion = req.body.hardQuestion;
    const totalExamTime = req.body.totalExamTime;
       
    if(!topicArea || !examTitle || !examType || !easyQuestion || !mediumQuestion || !hardQuestion || !totalExamTime){
        res.json({ status: CONSTANT.FAIL, message: CONSTANT.MESSAGE.REQUIRED_FIELDS_MISSING});
    } else {
        const examObj = {
            topicArea : topicArea,
            examTitle : examTitle,
            examType : examType,
            easyQuestion : easyQuestion,
            hardQuestion : hardQuestion,
            totalExamTime : totalExamTime,
            isDeleted : false
        };
       EXAM_COLLECTION.create(examObj, function(err, result){
        if(err)
            res.json({ status: CONSTANT.FAIL, message: "", err: err});
        else
           res.json({ status: CONSTANT.SUCCESS, message: CONSTANT.COLLECTION.EXAM + CONSTANT.MESSAGE.ADDED_SUCCESSFULLY, data: result});
       })
    }
}

/*
TODO: POST
Topic: update ExamDetails ById
*/
exports.updateexamDetailsById = (req, res) => {
    console.log(req.body)
    console.log(req.params)
    const topicArea = req.body.topicArea;
    const examTitle = req.body.examTitle;
    const examType = req.body.examType;
    const easyQuestion = req.body.easyQuestion;
    const mediumQuestion = req.body.mediumQuestion;
    const hardQuestion = req.body.hardQuestion;
    const totalExamTime = req.body.totalExamTime
    const Id = req.params.id;
    if (!commonService.isValidObjId(Id)) {
        return res.send({
            status: CONSTANT.FAIL,
            message: CONSTANT.COLLECTION.EXAM + CONSTANT.MESSAGE.NOT_FOUND_BY_ID
        });
    } 
    // else
    //  {
    //     if (!topicArea || !examTitle) {
    //         return res.json({ status: CONSTANT.FAIL, message: CONSTANT.MESSAGE.REQUIRED_FIELDS_MISSING });
    //     } 
        else {
            const examObj = {
                   topicArea : topicArea,
                   examTitle : examTitle,
                   examType : examType,
                   easyQuestion : easyQuestion,
                   mediumQuestion: mediumQuestion,
                   hardQuestion : hardQuestion,
                   totalExamTime : totalExamTime
            };
            EXAM_COLLECTION.findByIdAndUpdate(Id, { $set: examObj }, { new: true }, function (err, result) {
                if (err) {
                    res.send({ status: CONSTANT.ERROR, message: err });
                }
                res.send({ status: CONSTANT.SUCCESS, message: CONSTANT.COLLECTION.FEEDBACK + CONSTANT.MESSAGE.IS_UPDATED_SUCCESSFULLY, data: examObj });
            });
        }
    // }
}

/*
TODO: GET
Topic: get All ExamDetails
*/

exports.findAllExamdetails = (req, res) => {
    const limit = (req.body.limit) ? req.body.limit : 2;     
    const pageCount = (req.body.pageCount) ? req.body.pageCount : 0;
    var skip = (limit * pageCount);
    console.log("skip",skip)
    var totalRecords = 0;   
    EXAM_COLLECTION.countDocuments({ isDeleted: false },{}).lean().exec(function(err, count) {
        totalRecords = count;
        EXAM_COLLECTION.find({ isDeleted: false },{}).sort({ name: 1 }).skip(skip).limit(limit).lean().exec(function(examsOperatorError, exams_operators) {
            if (examsOperatorError || !exams_operators) {
                res.json({
                    status: CONSTANT.FAIL,
                    message: CONSTANT.COLLECTION.EXAM + CONSTANT.MESSAGE.NOT_FOUND
                });
            } else {
                res.json({
                    status: CONSTANT.SUCCESS,
                    message: { 'message': 'ExamDetails found successfully.', 'exams_operators': exams_operators, 'totalRecords': totalRecords }
                });
            }
        })
    })
};

/*
TODO: GET
Topic: get ExamDetails ById
*/

exports.getExamDetailsById = (req, res) => {
    const Id = req.params.id;
    if (!commonService.isValidObjId(Id)) {
        return res.send({
            status: CONSTANT.FAIL,
            message: CONSTANT.COLLECTION.EXAM + CONSTANT.MESSAGE.NOT_FOUND_BY_ID
        });
    } else {
        EXAM_COLLECTION.findById(Id).then(exam => {
            if (exam) {
                res.send({
                    status: CONSTANT.SUCCESS,
                    message: CONSTANT.MESSAGE.DATA_FOUND,
                    data: exam
                });
            } else {
                return res.send({
                    status: CONSTANT.FAIL,
                    message: CONSTANT.MESSAGE.DATA_NOT_FOUND
                });
            }
        });
    }
};

/*
TODO: POST
Topic: delete ExamDetails ById
*/

exports.deleteExamdetailsById = (req, res) => {
    const Id = req.params.id;
    if (!commonService.isValidObjId(Id)) {
        return res.send({
            status: CONSTANT.FAIL,
            message: CONSTANT.COLLECTION.EXAM + CONSTANT.MESSAGE.NOT_FOUND_BY_ID
        });
    } else {
        let myquery = { _id: Id };
        EXAM_COLLECTION.deleteOne(
            myquery,
            // { $set: { isDeleted: true } },
            // { new: false },
            function (err, result) {
                console.log(err, result)
                if (err) {
                    res.send({ status: CONSTANT.ERROR, message: err });
                } else{
                    res.send({
                        status: CONSTANT.SUCCESS,
                        message:
                            CONSTANT.COLLECTION.EXAM + CONSTANT.MESSAGE.DELETE_SUCCESSFULLY
                    });
                }
              
            }
        );
    }
};