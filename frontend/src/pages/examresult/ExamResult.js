import React, { useState } from "react";

//components
import PageTitle from "../../components/PageTitle/PageTitle";
import { Button } from "../../components/Wrappers/Wrappers";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//css
import "./style.css";

//style.js
import useStyles from "./style.js"

//data
import { Grid } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ExamResultTable from "./ExamResultTable";
import Widget from "../../components/Widget/Widget";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import mock from "./mock";
import { CreateExamResult } from "../../services/examResult.services";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const states = {
    edit: "success",
    pending: "warning",
    declined: "secondary",
};


export default function ExamResult() {
    var classes = useStyles();
    const [examresultopen, setExamResultopen] = useState(false)
    const [userId, setUserId] = useState("");
    const [date, setDate] = useState(dayjs('2014-06-12'));
    const [timeTaken, setTimeTaken] = useState("");
    const [examId, setExamId] = useState("");
    const [examName, setExamName] = useState("");
    const [rightAns, setRightAns] = useState("");
    const [wrongAns, setwrongAns] = useState("");
    const [ansGiven, setAnsGiven] = useState("");
    const [totalMarks, setTotalMarks] = useState("");
    const [totalMarksObtained, setTotalMarksObtained] = useState("");
    const [totalAnsCount, setTotalAnsCount] = useState("");


    const examresulthandleOpen = () => setExamResultopen(true)
    const examresulthandleClose = () => setExamResultopen(false)

    const examIdhandleChange = (event) => {
        setExamId(event.target.value);
    }

    const datehandleChange = (event) => {
        setDate(event.target.value);
    };

    // create Exam Result API

    const createExamResult = async () => {
        const obj = {
            "userId": userId,
            "date": date,
            "timeTaken": timeTaken,
            "examId": examId,
            "examName": examName
        }
        try {
            const res = await CreateExamResult(obj).then((data) => {
                if (data.status === "success") {
                    toast.success(data.message);
                } else {
                    toast.error(data.message);
                }
            })

        } catch (e) {
            console.log(e);
        }
        setUserId("")
        setDate("")
        setTimeTaken("")
        setExamId("")
        setExamName("")

    }


    return (
        <>
            <PageTitle title="Exam Result" />
            <Grid conatainer spacing={4}>
                <Grid item xs={12}>
                    <Box className="add-exam-result-btn">
                        <Button color="primary" margin="right-margin"
                            variant="contained"
                            onClick={examresulthandleOpen}
                        >
                            Add Result
                        </Button>
                    </Box>
                    <Modal
                        open={examresultopen}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={{ ...style, width: "36%" }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Add New Result
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
                                        label="User ID"
                                        placeholder="Add new User ID"
                                        onChange={(e) => setUserId(e.target.value)}
                                    />
                                    <DesktopDatePicker
                                        label="Date desktop"
                                        inputFormat="MM/DD/YYYY"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Exam Result Date"
                                        placeholder="dd/mm/yyyy"
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Time"
                                        placeholder="00:00"
                                        onChange={(e) => setTimeTaken(e.target.value)}
                                    />
                                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-label">Exam Id</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={examId}
                                            label="Exam Id"
                                            onChange={examIdhandleChange}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Exam Name"
                                        placeholder="Exam name"
                                        onChange={(e) => setExamName(e.target.value)}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Right Answer"
                                        placeholder="Answer"
                                        onChange={(e) => setRightAns(e.target.value)}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="wrong Answer"
                                        placeholder="Answer"
                                        onChange={(e) => setwrongAns(e.target.value)}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Given Answer"
                                        placeholder="Answer"
                                        onChange={(e) => setAnsGiven(e.target.value)}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Total Marks"
                                        placeholder="marks"
                                        onChange={(e) => setTotalMarks(e.target.value)}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Total Marks Obtained"
                                        placeholder="marks"
                                        onChange={(e) => setTotalMarksObtained(e.target.value)}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Total Answer Count"
                                        placeholder="total Answer"
                                        onChange={(e) => setTotalAnsCount(e.target.value)}
                                    />
                                    <Box
                                        className="save-exam-result-Btn"
                                    >
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            sx={{ mt: 2 }}
                                            onClick={() => {
                                                examresulthandleClose();
                                                createExamResult();
                                            }}>
                                            Submit
                                        </Button>
                                        <Button
                                            style={{ marginLeft: "10px" }}
                                            color="primary"
                                            variant="contained"
                                            sx={{ mt: 2 }}
                                            onClick={() => {
                                                examresulthandleClose();
                                            }}>
                                            Cancle
                                        </Button>
                                    </Box>
                                </div>
                            </Box>
                        </Box>
                    </Modal>
                </Grid>
                <Grid item xs={12}>
                    <Widget title="All Exam Result" upperTitle noBodyPadding>
                        <ExamResultTable data={mock.table}
                        />
                    </Widget>
                </Grid>
            </Grid>
        </>
    );
}