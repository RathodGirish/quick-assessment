const FEEDACK_COLLECTION = require('../module/feedback.module')
const commonService = require("../common/common");
const CONSTANT = require('../common/constant')


/*
TODO: POST
Topic: user Feedback 
*/

exports.userFeedback = (req, res) => {
    const examId = req.body.examId;
    const feedback = req.body.feedback;
    const review = req.body.review;
    const userId = req.body.userId;
    
    if(!examId || !feedback || !review || !userId){
        res.json({ status: CONSTANT.FAIL, message: CONSTANT.MESSAGE.REQUIRED_FIELDS_MISSING});
    } else {
        const feedbackObj = {
            examId : examId,
            feedback : feedback,
            review : review,
            userId : userId,
            isDeleted : false
        };
       FEEDACK_COLLECTION.create(feedbackObj, function(err, result){
        if(err)
            res.json({ status: CONSTANT.FAIL, message: "", err: err});
        else
           res.json({ status: CONSTANT.SUCCESS, message: CONSTANT.COLLECTION.FEEDBACK + CONSTANT.MESSAGE.ADDED_SUCCESSFULLY, data: result});
       })
    }
}

/*
TODO: POST
Topic: update Feedback ById
*/

exports.updateFeedbackById = (req, res) => {
    const examId = req.body.examId;
    const feedback = req.body.feedback;
    const review = req.body.review;
    const userId = req.body.userId;
    const Id = req.params.id;
    if (!commonService.isValidObjId(Id)) {
        return res.send({
            status: CONSTANT.FAIL,
            message: CONSTANT.COLLECTION.FEEDBACK + CONSTANT.MESSAGE.NOT_FOUND_BY_ID
        });
    } else {
        if (!examId || !feedback || !review || !userId) {
            return res.json({ status: CONSTANT.FAIL, message: CONSTANT.MESSAGE.REQUIRED_FIELDS_MISSING });
        } else {
            const feedbackObj = {
                   examId : examId,
                   feedback : feedback,
                   review : review,
                   userId : userId,
                  isDeleted: false
            };
            FEEDACK_COLLECTION.findByIdAndUpdate(Id, { $set: feedbackObj }, { new: true }, function (err, result) {
                if (err) {
                    res.send({ status: CONSTANT.ERROR, message: err });
                }
                res.send({ status: CONSTANT.SUCCESS, message: CONSTANT.COLLECTION.FEEDBACK + CONSTANT.MESSAGE.IS_UPDATED_SUCCESSFULLY, data: result });
            });
        }
    }
}

/*
TODO: GET
Topic: get AllFeedback
*/

exports.getAllFeedback = (req, res) => {
    const limit = (req.body.limit) ? req.body.limit : 10;     
    const pageCount = (req.body.pageCount) ? req.body.pageCount : 0;
    var skip = (limit * pageCount);
    var totalRecords = 0;   
    FEEDACK_COLLECTION.countDocuments({ isDeleted: false },{}).lean().exec(function(err, count) {
        totalRecords = count;
        FEEDACK_COLLECTION.find({ isDeleted: false },{}).sort({ name: 1 }).skip(skip).limit(limit).lean().exec(function(feedbackOperatorError, feedback_operators) {
            if (feedbackOperatorError || !feedback_operators) {
                res.json({
                    status: CONSTANT.FAIL,
                    message: CONSTANT.COLLECTION.FEEDBACK + CONSTANT.MESSAGE.NOT_FOUND
                });
            } else {
                res.json({
                    status: CONSTANT.SUCCESS,
                    message: { 'message': 'FeedBack found successfully.', 'feedback_operators': feedback_operators, 'totalRecords': totalRecords }
                });
            }
        })
    })
};

/*
TODO: GET
Topic: get Feedback ById
*/

exports.getFeedbackById = (req, res) => {
    const Id = req.params.id;
    if (!commonService.isValidObjId(Id)) {
        return res.send({
            status: CONSTANT.FAIL,
            message: CONSTANT.COLLECTION.FEEDBACK + CONSTANT.MESSAGE.NOT_FOUND_BY_ID
        });
    } else {
        FEEDACK_COLLECTION.findById(Id).then(feedback => {
            if (feedback) {
                res.send({
                    status: CONSTANT.SUCCESS,
                    message: CONSTANT.MESSAGE.DATA_FOUND,
                    data: feedback
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
Topic: delete Feedback ById
*/

exports.deleteFeedbackById = (req, res) => {
    const Id = req.params.id;
    if (!commonService.isValidObjId(Id)) {
        return res.send({
            status: CONSTANT.FAIL,
            message: CONSTANT.COLLECTION.FEEDBACK + CONSTANT.MESSAGE.NOT_FOUND_BY_ID
        });
    } else {
        let myquery = { _id: Id };
        FEEDACK_COLLECTION.deleteOne(
            myquery,
            function (err, result) {
                if (err) {
                    res.send({ status: CONSTANT.ERROR, message: err });
                } else{
                    res.send({
                        status: CONSTANT.SUCCESS,
                        message:
                            CONSTANT.COLLECTION.FEEDBACK + CONSTANT.MESSAGE.DELETE_SUCCESSFULLY
                    });
                }
              
            }
        );
    }
};
