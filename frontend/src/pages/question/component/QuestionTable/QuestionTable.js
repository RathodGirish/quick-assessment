import React from "react";
import {
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@material-ui/core";
import '../../Questions.css';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Typography } from "../../../../components/Wrappers/Wrappers";
// import { Button } from "../../../../components/Wrappers/Wrappers";
import Button from '@mui/material/Button';
import { useState } from "react";
import { useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Create from '@mui/icons-material/Create';
import { deletequestionById, getAllquestion, getquestionById, updatequestionById, postAllquestion } from "../../../../services/question.services"
import TablePagination from '@mui/material/TablePagination';
import { toast } from "react-toastify";

const states = {
    edit: "success",
    pending: "warning",
    declined: "secondary",
};

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


export default function TableComponent({ data }) {
    var keys = Object.keys(data[0]).map(i => i.toUpperCase());
    keys.shift(); // delete "id" key

    const [open, setOpen] = React.useState(false);
    const [on, seton] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const deleteopen = () => seton(true);
    const deleteClose = () => seton(false);
    const [questionId, setQuestionId] = useState("")
    const [getQuestions, setgetQuestions] = useState([])
    const [questionStatement, setquestionStatement] = useState("")
    const [testType, settestType] = useState("")
    const [level, setlevel] = useState("")
    const [topicArea, settopicArea] = useState("")
    const [questionType, setquestionType] = useState("")
    const [requiredTime, setrequiredTime] = useState("")
    const [answer, setanswer] = useState("")
    const [subQuestionType, setsubQuestionType] = useState("")
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [totalrecord, settotalrecord] = React.useState(0);


    const handleChangePage = (event, newPage) => {
        let obj = {
            limit: rowsPerPage,
            pageCount: newPage + 1
        }
        allquestions(obj);
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        let obj = {
            limit: parseInt(event.target.value),
            pageCount: 0
        }
        allquestions(obj);
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };


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

    // GetAllQuestions //

    const allquestions = async (obj) => {
        try {
            const res = await getAllquestion(obj)
            setgetQuestions(res.message.questions_operators)
            settotalrecord(res.message.totalRecords)
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        let obj = {
            limit: rowsPerPage,
            pageCount: page
        }
        allquestions(obj);
    }, []);

    // GetQuestionById //

    const questionById = async (id) => {
        await setQuestionId(id)
        try {
            const res = await getquestionById(id)
            setquestionStatement(res.data.questionStatement)
            settestType(res.data.testType);
            setlevel(res.data.level);
            settopicArea(res.data.topicArea);
            setquestionType(res.data.questionType);
            setrequiredTime(res.data.requiredTime);
            setanswer(res.data.answer);
            setsubQuestionType(res.data.subQuestionType);

        } catch (err) {
            console.log(err);
        }
        handleOpen()
    }

    // UpdateQuestionById //

    const updatefeedbackbyId = async () => {
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
            const res = await updatequestionById(questionId, obj).then((data) => {
                if (data.status === "success") {
                    toast.success(data.message);
                    allquestions()
                } else {
                    toast.error(data.message);
                }
            });
            await setQuestionId("")
        } catch (err) {
            console.log(err);
        }
    }

    //  DeletequestionById //

    const deletequestion = async (id) => {
        try {
            const res = await deletequestionById(id).then((data) =>{
                if (data.status === "success") {
                    toast.success(data.message);
                    allquestions()
                } else {
                    toast.error(data.message);
                }
            })           
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            <Table className="mb-0">
                <TableHead>
                    <TableRow>
                        {keys.map(key => (
                            <TableCell key={key}>{key}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getQuestions.map((e) => (
                        <TableRow key={e.id}>
                            <TableCell className="pl-3 fw-normal">{e.questionStatement}</TableCell>
                            <TableCell>{e.level}</TableCell>
                            <TableCell>{e.questionType}</TableCell>
                            <TableCell>
                                <Button
                                    color={states["edit"]}
                                    size="small"
                                    className="px-2"
                                    variant="contained"
                                    onClick={() => {
                                        handleOpen();
                                        questionById(e._id);
                                    }}
                                >
                                    <Create />
                                </Button>
                                <Button
                                    color={states["edit"]}
                                    size="small"
                                    className="px-2 margin"
                                    variant="contained"
                                    onClick={() => {
                                        deleteopen();
                                        deletequestion(e._id)
                                    }}
                                >
                                    <DeleteIcon />
                                </Button>
                            </TableCell>
                            <TableCell>
                            </TableCell>
                        </TableRow>
                    ))}
                    <Modal
                        open={open}
                        // onClose={handleClose} 
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={{ ...style, width: "46%" }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Update Question
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
                                    <Button variant="contained" className="submit-button" onClick={(e) => { handleClose(e); updatefeedbackbyId(e._id) }}>Submit</Button>
                                    <Button variant="contained" onClick={handleClose} >Close</Button>
                                </div>
                            </Box>
                        </Box>
                    </Modal>
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={totalrecord}
                page={page - 1}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}