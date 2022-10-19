const mongoose = require('mongoose');
const examReasultSchema = mongoose.Schema({
    userId:String,
    retakeDate:String,
    timeTaken:String,
    examId:String,
    examName:String,
    result:{
        rightAns:Number,
        wrongAns:Number,
        ansGiven:Number,
        totalMarks:Number,
        totalMarksObtained:Number,
        totalAnsCount:Number,
    },
    isDeleted:{type:Boolean, default:false},
    // isActive:{type:Boolean, default:false}
},{
    timestamps :true,
    versionKey: false
});

module.exports = mongoose.model('examResult',examReasultSchema);
