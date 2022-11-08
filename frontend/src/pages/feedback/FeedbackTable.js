import React from "react";
import {
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@material-ui/core";
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Typography } from "../../components/Wrappers/Wrappers";
// components
// import { Button } from "../../components/Wrappers/Wrappers";
import Button from '@mui/material/Button';
import { useState } from "react";
import { useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Create from '@mui/icons-material/Create';
import { getAllfeedback, deletefeedbackById, updatefeedbackById, getfeedbbackById } from "../../services/feedback.services";
import { toast } from 'react-toastify';
import TablePagination from '@mui/material/TablePagination';

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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [feedbackId, setFeedbackId] = useState("")
    const [feedbackdata, setfeedbackdata] = useState([])
    const [examId, setExamId] = useState("")
    const [feedback, setfeedback] = useState("")
    const [review, setreview] = useState("")
    const [userId, setuserId] = useState("")
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [totalrecord, settotalrecord] = React.useState(0);

    
    const handleChangePage = (event, newPage) => {
        let obj = {
            limit: rowsPerPage,
            pageCount: newPage + 1
        }
        allfeedback(obj);
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        let obj = {
            limit: parseInt(event.target.value),
            pageCount: 0
        }
        allfeedback(obj);
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

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

    // GetAllFeedback //

    const allfeedback = async (obj) => {
        try {
            const res = await getAllfeedback(obj)
            setfeedbackdata(res.message.feedback_operators)
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
        allfeedback(obj);
    }, []);

    // GetFeedbackById //

    const feedbbackById = async (id) => {
        await setFeedbackId(id)
        try {
            const res = await getfeedbbackById(id)        
            setExamId(res.data.examId)
            setfeedback(res.data.feedback);
            setreview(res.data.review);
            setuserId(res.data.userId);
        } catch (err) {
            console.log(err);
        }
        handleOpen()
    }

    // UpdateFeedbackById //

    const updatefeedbackbyId = async () => {
        let obj = {
            examId: examId,
            feedback: feedback,
            review: review,
            userId: userId
        }
        try {         
            const res = await updatefeedbackById(feedbackId, obj).then((data) =>{
                if (data.status === "success") {
                    toast.success(data.message);
                    allfeedback();
                  } else {
                    toast.error(data.message);
                  }
            })
            await setFeedbackId("")           
        } catch (err) {
            console.log(err);
        }
    }

    // DeleteFeedBckById //

    const deletefeedback = async (id) => {
        try {
            const res = await deletefeedbackById(id)
            allfeedback();
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
                    {feedbackdata && feedbackdata.length > 0 && feedbackdata.map((e) => (
                        <TableRow key={e.id}>
                            <TableCell className="pl-3 fw-normal">{e.examId}</TableCell>
                            <TableCell>{e.feedback}</TableCell>
                            <TableCell>{e.review}</TableCell>
                            <TableCell>{e.userId}</TableCell>
                            <TableCell>
                                <Button
                                    color={states["edit"]}
                                    size="small"
                                    className="px-2"
                                    variant="contained"
                                    onClick={() => feedbbackById(e._id)}
                                >
                                    <Create />
                                </Button>
                                <Button
                                    color={states["edit"]}
                                    size="small"
                                    className="px-2 margin"
                                    variant="contained"
                                    onClick={() => deletefeedback(e._id)}
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
                                Text in a modal
                            </Typography>
                            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
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
                                    <Button variant="contained" className="submit-button" onClick={(e) =>{handleClose(e); updatefeedbackbyId(e._id)}}>Submit</Button>
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