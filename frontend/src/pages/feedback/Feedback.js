import React, { useState } from "react";
import useStyles from "./styles";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";
import Widget from "../../components/Widget/Widget";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Grid } from "@material-ui/core";
import FeedbackTable from "../feedback/FeedbackTable"
import feedbackmock from "./feedbackmock";
import { addfeedback } from "../../services/feedback.services";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const mainChartData = getMainChartData();


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

export default function FeedBack() {
  var classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[examId, setExamId] = useState("")
  const[feedback, setfeedback] = useState("")
  const[review, setreview] = useState("")
  const[userId, setuserId] = useState("")

  const onTextChange = (e) => {
    if (e.target.name === "examId") {
      setExamId(e.target.value);
    }
    if (e.target.name === "feedback") {
      setfeedback(e.target.value);
    }
    if (e.target.name === "review") {
      setreview(e.target.value);
    }
    if (e.target.name === "userId") {
      setuserId(e.target.value);
    }
  };

  // CreateFeedback //

  const createfeedback = async () => {   
    let obj = {
      examId:examId,
      feedback:feedback,
      review:review,
      userId:userId
    }   
    try{
      const res = await addfeedback(obj).then((data) =>{
        if (data.status === "success") {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }) 
    }catch (err) {
      console.log(err);
    } 
     setExamId("")
     setfeedback("")
     setreview("") 
     setuserId("")
  }

   

  return (
    <>
      <PageTitle title="Feedback" /> 
      <div className="add-btn-position">
        <Button onClick={handleOpen} className="add-records">Add Feedback</Button>
      </div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: "46%" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            FeedBack
          </Typography>         
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="outlined-required"
                label="ExamId"
                placeholder="ExamId"
                onChange={onTextChange}
                name="examId"
                value={examId}
              />
              <TextField
                required
                id="outlined-required"
                label="FeedBack"
                placeholder="FeedBack"
                onChange={onTextChange}
                name="feedback"
                value={feedback}
              />
              <TextField
                id="outlined-password-input"
                label="Review"
                placeholder="Review"
                onChange={onTextChange}
                name="review"
                value={review}
              />
              <TextField
                id="outlined-read-only-input"
                label="UserId"
                placeholder="UserId"
                onChange={onTextChange}
                name="userId"
                value={userId}
              />            
            </div>
            <div className="button-position">
              <Button variant="contained" className="submit-button" onClick={() =>{handleClose(); createfeedback()}}>Submit</Button>
              <Button variant="contained" onClick={handleClose} >Close</Button>
            </div>
            {/* </Typography> */}
          </Box>
        </Box>
      </Modal>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget
            title="Feedback "
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <FeedbackTable data={feedbackmock.table} />
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

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
