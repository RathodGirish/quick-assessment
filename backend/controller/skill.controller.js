const SKILL_COLLECTION = require('../module/skill.module');
const commonService = require("../common/common");
const CONSTANT = require('../common/constant');

/*
TODO: POST
Topic:Create new Skill
*/
exports.createSkills = (req, res) => {
    const name = req.body.name
    if (!name) {
        return res.json({
            status: CONSTANT.FAIL,
            message: CONSTANT.MESSAGE.REQUIRED_FIELDS_MISSING
        });
    } else {
        SKILL_COLLECTION.findOne({ name: name, isDelete: false })
            .then(
                Skill => {
                    if (Skill) {
                        return res.json({
                            status: CONSTANT.FAIL,
                            message: CONSTANT.MESSAGE.SKILL_EXIST
                        });
                    } else {
                        let obj = {
                            name: name,
                            isDelete: false
                        }
                        SKILL_COLLECTION.create(obj, function (err, result) {
                            if (err) {
                                return res.send({ status: CONSTANT.FAIL, message: "", err: err });
                            } else {
                                return res.send({
                                    status: CONSTANT.SUCCESS,
                                    message: CONSTANT.COLLECTION.SKILL + CONSTANT.MESSAGE.ADDED_SUCCESSFULLY,
                                    data: result
                                });
                            }
                        })
                    }
                }
            )
    }
};

/*
TODO:POST
Topic: update Skill by id
*/
exports.updateSkillById = (req, res) => {
    const name = req.body.name;
    const Id = req.params.id;
    if (!commonService.isValidObjId(Id)) {
        return res.send({
            status: CONSTANT.FAIL,
            message: CONSTANT.COLLECTION.SKILL + CONSTANT.MESSAGE.NOT_FOUND_BY_ID
        });
    } else {
        if (!name) {
            return res.json({
                status: CONSTANT.FAIL,
                message: CONSTANT.MESSAGE.REQUIRED_FIELDS_MISSING
            });
        } else {
            SKILL_COLLECTION.findOne({ name: name, isDelete: false, _id: { $ne: Id } })
                .then(
                    Skill => {
                        if (Skill) {
                            return res.json({
                                status: CONSTANT.FAIL,
                                message: CONSTANT.MESSAGE.SKILL_EXIST
                            });
                        } else {
                            const skillObj = {
                                name: name
                            };
                            SKILL_COLLECTION.findByIdAndUpdate(Id, { $set: skillObj }, { new: true }, function (err, result) {
                                if (err) {
                                    res.send({ status: CONSTANT.ERROR, message: err });
                                }
                                res.send({
                                    status: CONSTANT.SUCCESS,
                                    message: CONSTANT.COLLECTION.SKILL + CONSTANT.MESSAGE.IS_UPDATED_SUCCESSFULLY,
                                    data: result
                                });
                            });
                        }
                    })

        }
    }
}

/*
TODO: POST
TOpic: get all skills
*/
exports.getAllSkills = function (req, res) {
    const limit = (req.body.limit) ? req.body.limit : 10;
    const pageCount = (req.body.pageCount) ? req.body.pageCount : 0;
    var skip = (limit * pageCount);
    var totalRecords = 0;
    SKILL_COLLECTION.countDocuments({ isDeleted: false }, {}).lean().exec(function (err, count) {
        totalRecords = count;
        SKILL_COLLECTION.find({ isDeleted: false }, {}).sort({ name: 1 }).skip(skip).limit(limit).lean().exec(function (skillOperatorError, skill_operators) {
            if (skillOperatorError) {
                res.json({
                    status: CONSTANT.FAIL,
                    message: CONSTANT.COLLECTION.USER + CONSTANT.MESSAGE.NOT_FOUND
                });
            } else {
                res.json({
                    status: CONSTANT.SUCCESS,
                    message: { 'message': CONSTANT.COLLECTION.SKILL + CONSTANT.MESSAGE.FOUND_SUCCESSFULLY, 'skill_operators': skill_operators, 'totalRecords': totalRecords }
                });
            }
        })
    })
};

/*
TODO:POST
Topic: delete skill by id
*/
exports.deleteSkillById = function (req, res) {
    const Id = req.params.id;
    if (!commonService.isValidObjId(Id)) {
        return res.send({
            status: CONSTANT.FAIL,
            message: CONSTANT.COLLECTION.SKILL + CONSTANT.MESSAGE.NOT_FOUND_BY_ID
        });
    } else {
        let myquery = { _id: Id };
        SKILL_COLLECTION.deleteOne(
            myquery,
            function (err, result) {
                if (err) {
                    res.send({
                        status: CONSTANT.ERROR,
                        message: err
                    });
                } else {
                    res.send({
                        status: CONSTANT.SUCCESS,
                        message: CONSTANT.COLLECTION.SKILL + CONSTANT.MESSAGE.DELETE_SUCCESSFULLY
                    });
                }
            }
        );
    }
};
/*
TODO:GET
Topic:get skill by id
*/
exports.getSkillById = (req, res) => {
    const Id = req.params.id;
    if (!commonService.isValidObjId(Id)) {
        return res.send({
            status: CONSTANT.FAIL,
            message: CONSTANT.COLLECTION.SKILL + CONSTANT.MESSAGE.NOT_FOUND_BY_ID
        })
    } else {
        SKILL_COLLECTION.findById(Id)
            .then(skill => {
                if (skill) {
                    res.send({
                        status: CONSTANT.SUCCESS,
                        message: CONSTANT.MESSAGE.DATA_FOUND,
                        data: skill
                    });
                } else {
                    return res.send({
                        status: CONSTANT.FAIL,
                        message: CONSTANT.MESSAGE.DATA_NOT_FOUND
                    });
                }
            })
    }
};