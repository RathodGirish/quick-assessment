const express = require('express');
const router = express.Router();
const auth = require("../common/authentication")

const skill = require('../controller/skill.controller');
router.post('/createSkill', auth, skill.createSkills);
router.post('/updateSkillById/:id', auth, skill.updateSkillById);
router.post('/getAllSkills', auth, skill.getAllSkills);
router.get('/getSkillById/:id', auth, skill.getSkillById);
router.post('/deleteSkillById/:id', auth, skill.deleteSkillById);

module.exports = router;