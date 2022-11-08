const Feedback = require("../controller/feedback.controller")
const express = require("express")
const auth = require("../common/authentication")
const router = express.Router();


router.post("/userFeedback",auth, Feedback.userFeedback);
router.post("/updateFeedbackById/:id", auth, Feedback.updateFeedbackById);
router.post("/getAllFeedback", auth, Feedback.getAllFeedback);
router.get('/getFeedbackById/:id', auth, Feedback.getFeedbackById);
router.post("/deleteFeedbackById/:id",auth, Feedback.deleteFeedbackById)

module.exports = router;