const jwt = require('jsonwebtoken')
const USER_COLLECTION = require('../module/user.module')
const commonService = require("../common/common");
const CONSTANT = require('../common/constant')

/*
TODO: POST
Topic: Register User
*/

exports.registerUser = (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const contactno = req.body.contactno
    const anonymousName = req.body.anonymousName
    const userType = req.body.userType
    const score = req.body.score
    const password = req.body.password

    if (commonService.isUndefinedOrNull(email)) {
        return res.json({
            status: CONSTANT.FAIL,
            message: CONSTANT.MESSAGE.REQUIRED_FIELDS_MISSING
        });
    } else {
        if (!commonService.isValidateEmail(email)) {
            return res.json({
                status: CONSTANT.FAIL,
                message: CONSTANT.MESSAGE.EMAIL_INVALID
            });
        } else {
            USER_COLLECTION.findOne({ email: email, isDeleted: false })
                .then(
                    user => {
                        if (user) {
                            return res.json({
                                status: CONSTANT.FAIL,
                                message: CONSTANT.MESSAGE.EMAIL_EXIST
                            });
                        } else {
                            commonService.encryptPassword(password, newPassword => {
                            const user = {
                                firstName: firstName ? firstName : "",
                                lastName: lastName ? lastName : "",
                                email: email,
                                contactno: contactno ? contactno : "",
                                anonymousName: anonymousName ? anonymousName : "",
                                userType: userType ? userType : "",
                                score: score ? score : "",
                                password: newPassword ? newPassword : "",
                                isDeleted: false
                            };

                            USER_COLLECTION.create(user, function (err, result) {
                                if (err) {
                                    return res.send({ status: CONSTANT.FAIL, message: "", err: err });
                                } else {
                                    return res.send({ status: CONSTANT.SUCCESS, message: CONSTANT.COLLECTION.USER + CONSTANT.MESSAGE.REGISTER_SUCCESSFULLY, data: result });
                                }
                            });
                        });  
                        }
                    }
                )
        }
    }
}

/*
TODO: POST
Topic: Login User
*/

exports.loginUser = (req,res) =>{
    const email = req.body.email
    const password = req.body.password
    if(commonService.isUndefinedOrNull(password) || commonService.isUndefinedOrNull(email)){
        return res.json({
            status: CONSTANT.FAIL,
            message: CONSTANT.MESSAGE.EMAIL_INVALID
        });
    } else {
            //check user is reister or not
            USER_COLLECTION.findOne({email: email, isDeleted: false})
            .then(user =>{             
                if(user){
                    commonService.decryptPassword(user.password, (decryptedpassword) =>{                   
                        if (password == decryptedpassword ){
                          var userDetails = {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            contactno: user.contactno,
                            anonymousName: user.anonymousName,
                            userType: user.userType,
                            score: user.score,
                            id: user.id
                          };
                           // create token for session
                          var token = jwt.sign(userDetails, "testing",{
                            expiresIn: 2592000  // expires in 30 days
                        });                    
                            return res.send({
                            status: CONSTANT.SUCCESS,
                            message: CONSTANT.MESSAGE.LOGIN_SUCESSFULLY,
                            data: userDetails,
                            token: "Bearer " + token
                         });


                        //   return res.json({
                        //     status: CONSTANT.SUCCESS,
                        //     message: CONSTANT.MESSAGE.LOGIN_SUCESSFULLY,
                        //     data: userDetails
                        // });
                          
                        } else {
                            return res.json({
                                status: CONSTANT.FAIL,
                                message: CONSTANT.MESSAGE.PASSOWRD_INVALID
                            });
                        }
                    })
                } else {
                    return res.send({
                        status: CONSTANT.FAIL,
                        message: err.MESSAGE || CONSTANT.MESSAGE.EMAIL_INVALID
                    })
                }
            })
            .catch (err =>({
                status: CONSTANT.FAIL,
                message: EvalError.message || CONSTANT.MESSAGE.ERROR_OCCURRED
            })
            )
    }
}

/*
TODO: POST
Topic: update User
*/

exports.updateUserDetailsById = (req, res) => {   
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const contactno = req.body.contactno;
    const anonymousName = req.body.anonymousName;
    const userType = req.body.userType;
    const score = req.body.score
    const Id = req.params.id;
    if (!commonService.isValidObjId(Id)) {
        return res.send({
            status: CONSTANT.FAIL,
            message: CONSTANT.COLLECTION.USER + CONSTANT.MESSAGE.NOT_FOUND_BY_ID
        });
    } 
    // else
    //  {
    //     if (!topicArea || !examTitle) {
    //         return res.json({ status: CONSTANT.FAIL, message: CONSTANT.MESSAGE.REQUIRED_FIELDS_MISSING });
    //     } 
        else {
            const userObj = {
                   firstName : firstName,
                   lastName : lastName,
                   email : email,
                   contactno : contactno,
                   anonymousName: anonymousName,
                   userType : userType,
                   score : score
            };
            USER_COLLECTION.findByIdAndUpdate(Id, { $set: userObj }, { new: true }, function (err, result) {
                if (err) {
                    res.send({ status: CONSTANT.ERROR, message: err });
                }
                res.send({ status: CONSTANT.SUCCESS, message: CONSTANT.COLLECTION.USER + CONSTANT.MESSAGE.IS_UPDATED_SUCCESSFULLY, data: result });
            });
        }
    // }
}

/*
TODO: GET
Topic: get getAllUser
*/

exports.getAllUser = (req, res) => {
    const limit = (req.body.limit) ? req.body.limit : 2;     
    const pageCount = (req.body.pageCount) ? req.body.pageCount : 0;
    var skip = (limit * pageCount);
    var totalRecords = 0;   
    USER_COLLECTION.countDocuments({ isDeleted: false },{}).lean().exec(function(err, count) {
        totalRecords = count;
        USER_COLLECTION.find({ isDeleted: false },{}).sort({ name: 1 }).skip(skip).limit(limit).lean().exec(function(userOperatorError, user_operators) {
            if (userOperatorError || !user_operators) {
                res.json({
                    status: CONSTANT.FAIL,
                    message: CONSTANT.COLLECTION.USER + CONSTANT.MESSAGE.NOT_FOUND
                });
            } else {
                res.json({
                    status: CONSTANT.SUCCESS,
                    message: { 'message': 'User found successfully.', 'user_operators': user_operators, 'totalRecords': totalRecords }
                });
            }
        })
    })
};

/*
TODO: GET
Topic: get User ById
*/

exports.getUserById = (req, res) => {
    const Id = req.params.id;
    if (!commonService.isValidObjId(Id)) {
        return res.send({
            status: CONSTANT.FAIL,
            message: CONSTANT.COLLECTION.USER + CONSTANT.MESSAGE.NOT_FOUND_BY_ID
        });
    } else {
        USER_COLLECTION.findById(Id).then(user => {
            if (user) {
                res.send({
                    status: CONSTANT.SUCCESS,
                    message: CONSTANT.MESSAGE.DATA_FOUND,
                    data: user
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
Topic: delete User ById
*/

exports.deleteUserById = (req, res) => {
    const Id = req.params.id;
    if (!commonService.isValidObjId(Id)) {
        return res.send({
            status: CONSTANT.FAIL,
            message: CONSTANT.COLLECTION.USER + CONSTANT.MESSAGE.NOT_FOUND_BY_ID
        });
    } else {
        let myquery = { _id: Id };
        USER_COLLECTION.deleteOne(
            myquery,
            // { $set: { isDeleted: true } },
            // { new: false },
            function (err, result) {               
                if (err) {
                    res.send({ status: CONSTANT.ERROR, message: err });
                } else{
                    res.send({
                        status: CONSTANT.SUCCESS,
                        message:
                            CONSTANT.COLLECTION.USER + CONSTANT.MESSAGE.DELETE_SUCCESSFULLY
                    });
                }
              
            }
        );
    }
};