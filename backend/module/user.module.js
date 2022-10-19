const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    contactno: String,
    anonymousName: String,
    userType: String,
    score: Number,
    password: String,
    isDeleted:{type: Boolean, default: false}
},{
    timestamps: true,
    versionkey: false
});

module.exports = mongoose.model('user',UserSchema)