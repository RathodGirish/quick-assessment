import React, { useState } from "react";
import './Questions.css';
import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";
import QuestionTable from "./component/QuestionTable/QuestionTable"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { createQuestion } from "../../services/question.services"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Question(props) {
  var classes = useStyles();
  var theme = useTheme();

  // local
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [questionStatement, setquestionStatement] = useState("")
  const [testType, settestType] = useState("")
  const [level, setlevel] = useState("")
  const [topicArea, settopicArea] = useState("")
  const [questionType, setquestionType] = useState("")
  const [requiredTime, setrequiredTime] = useState("")
  const [answer, setanswer] = useState("")
  const [subQuestionType, setsubQuestionType] = useState("")


  

  const onTextChange = (e) => {
    if (e.target.name === "questionStatement") {
      setquestionStatement(e.target.value);
    }
    if (e.target.name === "testType") {
      settestType(e.target.value);
    }
    if (e.target.name === "level") {
      setlevel(e.target.value);
    }
    if (e.target.name === "topicArea") {
      settopicArea(e.target.value);
    }
    if (e.target.name === "questionType") {
      setquestionType(e.target.value);
    }
    if (e.target.name === "requiredTime") {
      setrequiredTime(e.target.value);
    }
    if (e.target.name === "answer") {
      setanswer(e.target.value);
    }
    if (e.target.name === "subQuestionType") {
      setsubQuestionType(e.target.value);
    }
  };

  // CreateQuestion //

  const createquestion = async () => {
    let obj = {
      questionStatement: questionStatement,
      testType: testType,
      level: level,
      topicArea: topicArea,
      questionType: questionType,
      requiredTime: requiredTime,
      answer: answer,
      subQuestionType: subQuestionType
    }
    try {
      const res = await createQuestion(obj).then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
    } catch (err) {
         console.log(err);
    }
    setquestionStatement("")
    settestType("")
    setlevel("")
    settopicArea("")
    setquestionType("")
    setrequiredTime("")
    setanswer("")
    setsubQuestionType("")
  }


  return (
    <>
      <PageTitle title="Questions" />
      <div className="add-btn-position">
        <Button onClick={handleOpen} className="add-records">Add Questions</Button>
      </div>    
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, width: "46%" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Question
            </Typography>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >       sss
              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="Question Statement"
                  placeholder="Question Statement"
                  onChange={onTextChange}
                  name="questionStatement"
                  value={questionStatement}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Test type"
                  placeholder="Test type"
                  onChange={onTextChange}
                  name="testType"
                  value={testType}
                />
                <TextField
                  id="outlined-password-input"
                  label="Level"
                  placeholder="Level"
                  onChange={onTextChange}
                  name="level"
                  value={level}
                />
                <TextField
                  id="outlined-read-only-input"
                  label="Topic Area"
                  placeholder="Topic Area"
                  onChange={onTextChange}
                  name="topicArea"
                  value={topicArea}
                />
                <TextField
                  id="outlined-Required"
                  label="Question Type"
                  placeholder="Question Type"
                  onChange={onTextChange}
                  name="questionType"
                  value={questionType}
                />
                <TextField
                  id="outlined-Required"
                  label="Required time"
                  placeholder="Required time"
                  onChange={onTextChange}
                  name="requiredTime"
                  value={requiredTime}
                />
                <TextField
                  id="outlined-Required"
                  label="Answer"
                  placeholder="Answer"
                  onChange={onTextChange}
                  name="answer"
                  value={answer}
                />
                <TextField
                  id="outlined-Required"
                  label="Subquestion Type"
                  placeholder="Subquestion Type"
                  onChange={onTextChange}
                  name="subQuestionType"
                  value={subQuestionType}
                />
              </div>
              <div className="button-position">
                <Button variant="contained" className="submit-button" onClick={() => { handleClose(); createquestion(); }}>Submit</Button>
                <Button variant="contained" onClick={handleClose} >Close</Button>
              </div>
              {/* </Typography> */}
            </Box>
          </Box>
        </Modal>    
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget
            title="Questions"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <QuestionTable data={mock.table} />
          </Widget>
        </Grid>
      </Grid>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}