import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios';

import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Modal,
} from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import { GetAllSkill, GetSkillById } from "../../services/skills.setvice";
import { UpdateSkill } from "../../services/skills.setvice";
import { DeleteSkill } from "../../services/skills.setvice";
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import TablePagination from '@mui/material/TablePagination';

// css
import "./style.css";

//style.js
import useStyles from "./style.js"


// data
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

export default function SkillTable() {
  var classes = useStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setData(null);
  };
  const [skillId, setSkillId] = useState("");
  const [skills, setskills] = useState([]);


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalRecord, setTotalRecord] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    let obj = {
      limit: rowsPerPage,
      pageCount: newPage
    }
    getAllSkill(obj);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    let obj = {
      limit: parseInt(event.target.value),
      pageCount: 0
    }

    getAllSkill(obj);
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  //Get skill By Id API
  const getSkillData = async (id) => {
    await setSkillId(id)
    try {
      const res = await GetSkillById(id,data)
      setName(res.data.name)
    } catch (e) {
      console.log(e);
    }
    handleOpen()
  }

  useEffect(() => {
    let obj = {
      limit: rowsPerPage,
      pageCount: page
    }
    getAllSkill(obj);
  }, []);

  //Get All Skill API
  const getAllSkill = async (obj) => {
    try {
      const res = await GetAllSkill(obj)
      setskills(res.message.skill_operators)
      setTotalRecord(res.message.totalRecords)
    } catch (e) {
      console.log(e);
    }
  }

  //Update Skill By Id 
  const updateSkill = async () => {
    const obj = { "name": name }
    try {
      const res = await UpdateSkill(skillId, obj).then((data) => {

        if (data.status === "success") {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      await setSkillId("")
      getAllSkill();
    } catch (err) {
      console.log(err);
    }
  }
  //Delete Skill By Id
  const deleteSkill = async (id) => {
    try {
      const res = await DeleteSkill(id)
      getAllSkill();
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          <TableCell className={classes.textCenter} key="#">#</TableCell>
          <TableCell className={classes.textCenter} key="name">Name</TableCell>
          <TableCell className={classes.textCenter} key="action">Action</TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {skills && skills.map((e, i) => (
          <TableRow key={i}>
            <TableCell className={classes.textCenter}>{i + 1}</TableCell>
            <TableCell className={classes.textCenter + " pl-3 fw-normal"}>{e.name}</TableCell>
            <TableCell className={classes.textCenter}>
              <Box>
                <ButtonGroup>
                  {/* Update Button */}
                  <Button
                    color={states["edit"]}
                    size="small"
                    variant="contained"
                    onClick={() =>{
                      getSkillData(e._id);
                    }
                    }
                  >
                    <EditIcon/>
                  </Button>

                  {/* Delete Button */}
                  <Button
                    color={states["edit"]}
                    style={{marginLeft: "10px"}}
                    size="small"
                    variant="contained"
                    onClick={() => deleteSkill(e._id)}>
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
              Update Skill
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
                  label="Skill"
                  placeholder="update skill"
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  value={name}
                />
                <Box className="save-Skill-Btn">
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{mt: 2}}
                    onClick={() => {
                      handleClose();
                      updateSkill();}}>
                    Update
                  </Button>
                  <Button
                    style={{marginLeft: "10px"}}
                    color="primary"
                    variant="contained"
                    sx={{mt: 2}}
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
      <TablePagination
        component="div"
        count={totalRecord}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Table>
  )
}