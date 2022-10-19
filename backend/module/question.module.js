const mongoose = require('mongoose')
const QuestionSchema = mongoose.Schema({
    questionStatement: String,
    testType: String,
    level: String,
    topicArea: String,
    questionType: String,
    option: [],
    tag: [],
    requiredTime: String,
    answer: String,
    subQuestionType: String,
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionkey: false
});

module.exports = mongoose.model('question', QuestionSchema)