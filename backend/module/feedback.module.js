const mongoose = require('mongoose')
const FeedbackSchema = mongoose.Schema({
    examId : String,
    feedback : String,
    review : String,
    userId : String,
    isDeleted:{type: Boolean, default: false}
},{
    timestamps: true,
    versionkey: false
});

module.exports = mongoose.model('feedback',FeedbackSchema)