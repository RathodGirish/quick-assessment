import React, { useState , useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import axios from 'axios';

import { Modal } from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import { CreateSkills } from "../../services/skills.setvice"
import { Button } from "../../components/Wrappers/Wrappers";

// css
import "./style.css";

//style.js
import useStyles from "./style.js"


// data
import mock from "../dashboard/mock";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { CommentsDisabledOutlined } from "@mui/icons-material";
import SkillTable from "./SkillTable";

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

export default function Skill() {
  var classes = useStyles();
  const [open, setOpen] = useState(false);
  const [skillopen, setSkillopen] = useState(false)
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const skillhandleOpen = () => setSkillopen(true)
  const skillhandleClose = () => setSkillopen(false)
 

  // create skill API

  const createSkill = async () => {
    const obj = { "name": name }
    try {
      const res = await CreateSkills(obj)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <PageTitle title="Skill" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box className="add-skill-btn">
            <Button color="primary" margin="right-margin" variant="contained" 
            onClick={skillhandleOpen}
            >
              Add Skill
            </Button>
          </Box>
          <Modal
            open={skillopen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add New Skill
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
                    placeholder="Add new skill"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Box
                    className="save-Skill-Btn"
                  >
                    <Button 
                    color="primary"
                    variant="contained"
                    sx={{mt: 2}} 
                    onClick={() => {
                      skillhandleClose();
                      createSkill();}}>
                      Submit
                    </Button>
                    <Button 
                     style={{marginLeft: "10px"}}
                     color="primary"
                    variant="contained"
                    sx={{mt: 2}} 
                    onClick={() => {
                      skillhandleClose();
                      createSkill();}}>
                      Cancle
                    </Button>
                  </Box>
                </div>
              </Box>
            </Box>
          </Modal>
        </Grid>
        <Grid item xs={12}>
          <Widget title="All Skill Tests " upperTitle noBodyPadding>
            <SkillTable data={mock.table}            
             />
          </Widget>
        </Grid>
      </Grid>     
  </>
  );
}
