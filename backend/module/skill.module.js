const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillSchema = mongoose.Schema({
    name:{type: String},
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionkey: false
});

module.exports = mongoose.model('skill',SkillSchema);