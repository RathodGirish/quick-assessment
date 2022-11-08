import React, { useState, useEffect } from 'react';
import {
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Modal,
} from "@material-ui/core";

// components
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { GetAllExamResult } from '../../services/examResult.services';
import { GetAllExamResult, GetExamResultById, UpdateExamResult } from "../../services/examResult.services"


import TablePagination from '@mui/material/TablePagination';
// css
// import "./style.css";

//style.js
import useStyles from "./style.js"


// data
import ExamResult from './ExamResult';
import mock from "./mock";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { ButtonGroup } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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

export default function ExamResultTable() {
    var classes = useStyles();
    const [open, setOpen] = useState(false);
    const [examResultdata, setExamResultData] = useState([])
    const [userId, setUserId] = useState("")
    const [date, setDate] = useState("")
    const [timeTaken, setTimeTaken] = useState("")
    const [examId, setExamId] = useState("")
    const [examName, setExamName] = useState("")
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setExamResultData(null);
    };
    const [examResultId, setExamResultId] = useState("");

    const [totalRecord, setTotalRecord] = React.useState(0);

    //Get Exam Result By Id API
    const ExamResultById = async (id) => {
        await setExamResultId(id)
        try {
            const res = await GetExamResultById(id)
            setUserId(res.data.userId)
            setDate(res.data.date)
            setTimeTaken(res.data.timeTaken)
            setExamId(res.data.examId)
            setExamName(res.data.examName)

        } catch (e) {
            console.log(e);
        }
        handleOpen()
    }

    useEffect(() => {
        AllExamResult();

    }, []);

    //Get All Exam Result API
    const AllExamResult = async () => {
        console.log("getAllExamResult==")
        try {
            const res = await GetAllExamResult()
            setExamResultData(res.message.examResult_operators)
            console.log("res", res.message.examResult_operators)
            // setTotalRecord(res.message.totalRecords)
        } catch (e) {
            console.log(e);
        }
    }

    //Update Exam Result By Id 
    const updateExamResult = async () => {
        const obj = {
            "userId": userId,
            "date": date,
            "timeTaken": timeTaken,
            "examId": examId,
            "examName": examName
        }
        try {
            const res = await UpdateExamResult(examResultId, obj).then((data) => {

                if (data.status === "success") {
                    toast.success(data.message);
                } else {
                    toast.error(data.message);
                }
            })
            console.log("vvvvvvv=", res);
            await setExamResultId("")
            AllExamResult();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Table className='mb-0'>
            <TableHead>
                <TableRow>
                    <TableCell className={classes.textCenter} key="userId">
                        User Id
                    </TableCell>
                    <TableCell className={classes.textCenter} key="date">
                        Date
                    </TableCell>
                    <TableCell className={classes.textCenter} key="timeTaken">
                        Time Taken
                    </TableCell>
                    <TableCell className={classes.textCenter} key="examId">
                        Exam Id
                    </TableCell>
                    <TableCell className={classes.textCenter} key="examName">
                        Exam Name
                    </TableCell>
                    <TableCell className={classes.textCenter} key="action">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {examResultdata && examResultdata.map((e, i) => (
                    <TableRow key={i}>
                        <TableCell className={classes.textCenter + " pl-3 fw-normal"}>
                            {e.userId}
                        </TableCell>
                        <TableCell>
                            {e.date}
                        </TableCell>
                        <TableCell>
                            {e.timeTaken}
                        </TableCell>
                        <TableCell>
                            {e.examId}
                        </TableCell>
                        <TableCell>
                            {e.examName}
                        </TableCell>
                        <TableCell className={classes.textCenter}>
                            <Box >
                                <ButtonGroup>
                                    {/* Update Button */}
                                    <Button
                                        color={states["edit"]}
                                        size="small"
                                        variant="contained"
                                        onClick={() => {
                                            ExamResultById(e._id);
                                        }
                                        }
                                    >
                                        <EditIcon />
                                    </Button>

                                    {/* Delete Button */}
                                    <Button
                                        color={states["edit"]}
                                        style={{ marginLeft: "10px" }}
                                        size="small"
                                        variant="contained"
                                    // onClick={() => deleteSkill(e._id)}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </ButtonGroup>
                                <Box
                                    m={1}
                                    display="flex"
                                    justifyContent="flex-end"
                                    alignItems="flex-end"
                                >
                                </Box>
                            </Box>
                        </TableCell>
                    </TableRow>
                ))}
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Update Exam Result
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
                                    placeholder="update skill"
                                    onChange={(e) => setUserId(e.target.value)}
                                    name="userId"
                                    value={userId}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Exam Result Date"
                                    placeholder="dd/mm/yyyy"
                                    onChange={(e) => setDate(e.target.value)}
                                    name="date"
                                    value={date}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Time"
                                    placeholder="00:00"
                                    onChange={(e) => setTimeTaken(e.target.value)}
                                    name="timeTaken"
                                    value={timeTaken}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Exam ID"
                                    placeholder="Exam Id"
                                    onChange={(e) => setUserId(e.target.value)}
                                    name="examId"
                                    value={examId}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Exam Name"
                                    placeholder="Exam Name"
                                    onChange={(e) => setUserId(e.target.value)}
                                    name="examName"
                                    value={examName}
                                />

                                <Box className="save-exam-result-Btn">
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        sx={{ mt: 2 }}
                                        onClick={() => {
                                            handleClose();
                                            updateExamResult();
                                        }}>
                                        Update
                                    </Button>
                                    <Button
                                        style={{ marginLeft: "10px" }}
                                        color="primary"
                                        variant="contained"
                                        sx={{ mt: 2 }}
                                        onClick={() => handleClose()}
                                    >
                                        Cancle
                                    </Button>
                                </Box>
                            </div>
                        </Box>
                    </Box>
                </Modal>
            </TableBody>
        </Table>
    )
}