const Exam = require("../controller/exam.controller")
const express = require("express")
const auth = require("../common/authentication")
const router = express.Router();


router.post("/addExamDetails",auth, Exam.addExamDetails);
router.post("/updateExamDetailsById/:id", auth, Exam.updateexamDetailsById);
router.get("/getAllExamdetails", auth, Exam.findAllExamdetails);
router.get('/getExamDetailsById/:id', auth, Exam.getExamDetailsById);
router.post("/deleteExamDetailsById/:id",auth, Exam.deleteExamdetailsById);

module.exports = router;