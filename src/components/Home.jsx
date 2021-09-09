import React, { useState } from 'react';
import Navbar from "./Navbar.jsx";
import HomeInfo from "./Home-Info.jsx";
import {BrowserRouter as Router,Route,Redirect,Switch} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
  
export default function Header(){

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
    <div>
        {/* {localStorage.getItem('step-user-auth-token') && <Redirect to="/profile"/>} */}
        <Navbar/>
        <Button onClick={handleClickOpen} variant="contained" color="secondary" style={{marginTop:"10px",marginLeft:"5px",width: "170px",
  height: "50px",color: '#FFFFFF',fontSize:'19px'}}><b>Instructions</b></Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Instructions"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              1. How to create test
              <ul>
                  <li>click on create test button</li>
                  <li>fill the details in create test form</li>
                  <li>on profile section, click on show data to view all tests created</li>
                  <li>select your created test and click add question button</li>
                  <li>add questions to the test</li>
                  <li>then, share the id of test to the students</li>
                  <li>with test id, students can take the test</li>
              </ul>
            </DialogContentText>
          </DialogContent>
          <DialogContent>
            <DialogContentText>
                1. How to take test
                <ul>
                    <li>click on take test button</li>
                    <li>enter test id shared by your teacher</li>
                    <li>after you entered the id, you can view all questions of test</li>
                    <li>click save button to save answer of particular question</li>
                    <li>remember, you can save the answer only once of particular question</li>
                    <li>click submit button to submit the test</li>
                    <li>remember, you can saubmit the test only once</li>
                </ul>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <HomeInfo/>
    </div>
    );
}