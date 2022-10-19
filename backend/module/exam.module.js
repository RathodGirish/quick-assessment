const mongoose = require('mongoose')
const ExamSchema = mongoose.Schema({
    topicArea : String,
    examTitle : String,
    examType : String,
    easyQuestion : String,
    mediumQuestion : String,
    hardQuestion : String,
    totalExamTime : String,
    isDeleted:{type: Boolean, default: false}
},{
    timestamps: true,
    versionkey: false
});

module.exports = mongoose.model('exam',ExamSchema)