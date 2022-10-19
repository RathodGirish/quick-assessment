
const examResult = require("../controller/examResult.controller");
const express = require("express");
const router = express.Router();
const auth = require("../common/authentication")

router.post("/createExamResult",auth, examResult.createExamResult);
router.post("/updateExamResultById/:id",auth, examResult.updateExamResultById);
router.get("/getExamResultById/:id",auth, examResult.getExamResultById);
router.get("/getAllExamResult",auth, examResult.getAllExamResult);
router.post("/deleteExamResultById/:id",auth, examResult.deleteExamResultById);

module.exports = router;

