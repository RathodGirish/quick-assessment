import React from "react";
import PageTitle from "../../components/PageTitle";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Grid } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import "./profile.css"
import { useEffect } from "react";
import { useState } from "react";
export default function Profile() {

    const [data, setdata] = useState({})

    const getprofiledata = () => {
        let UserData = localStorage.getItem("userData");
        setdata(JSON.parse(UserData))
        console.log("UserData", UserData, typeof UserData)
    }

    useEffect(() => {
        getprofiledata()
    }, [])

    return (
        <>
            <PageTitle title="Profile" />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <div >
                        <AccountCircleIcon className="user-name-position" />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    {/* {
                        data && data.map((item) => ( */}
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField id="standard-basic" label="First Name" value={data.firstName || ""} variant="standard" />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="standard-basic" label="Last Name" value={data.lastName || ""} variant="standard" />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="standard-basic" label="Contact No" value={data.contactno || ""} variant="standard" />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="standard-basic" label="Anonmous Name" value={data.anonymousName || ""} variant="standard" />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="standard-basic" label="User Type" value={data.userType || ""} variant="standard" />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="standard-basic" label="Score" value={data.score || ""} variant="standard" />
                                </Grid>
                            </Grid>
                        {/* )) */}
                    {/* } */}
                </Grid>
            </Grid>
        </>
    );
}