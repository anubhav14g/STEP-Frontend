import React, { useState } from 'react';
import Navbar from "./Navbar.jsx";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as allApis from "./api";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {BrowserRouter as Router,Route,Redirect,Switch} from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

export default function CreateTest(){
    
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [isOpened, setIsOpened] = useState(false);

    const [ifError, setErrorMessage] = useState(true);

    const [state,setState] = useState({
        name : '',
        type : '',
        total_questions : '',
        start_time : '',
        end_time : '',
        max_marks : ''
    });
    
    const [message,setMessage] = useState()
    
    const handleInputChange = (event) => {
        setState((prevProps) => ({
          ...prevProps,
          [event.target.name]: event.target.value
        }));
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
        {allApis.callAPI5(state,setMessage,setIsOpened,setErrorMessage)}
    };

    return(
    <div>
        <Navbar/>
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      {isOpened && <Button variant="contained" color="secondary" style={{marginTop:"0px",marginLeft:10,width: "570px",
  height: "100px",color: '#FFFFFF',fontSize:'19px'}}><b>{message}</b></Button> }
        {!ifError && <Redirect to="/profile"/>}
        <Typography component="h1" variant="h4" style={{color: "red"}}>
          Create the test...
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={state.name}
            onChange={handleInputChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="type"
            label="Type"
            name="type"
            value={state.type}
            onChange={handleInputChange}
            autoFocus
            select
          >
          <MenuItem value="Mcq">Mcq</MenuItem>
          <MenuItem value="Theory">Theory</MenuItem>
          </TextField>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="total_questions"
            label="Total Questions"
            name="total_questions"
            value={state.total_questions}
            onChange={handleInputChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="start_time"
            label="Start Time"
            name="start_time"
            value={state.start_time}
            type='datetime-local'
            onChange={handleInputChange}
            autoFocus
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="end_time"
            label="End Time"
            name="end_time"
            value={state.end_time}
            type='datetime-local'
            onChange={handleInputChange}
            autoFocus
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="max_marks"
            label="Max Marks"
            name="max_marks"
            value={state.max_marks}
            onChange={handleInputChange}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClickOpen}
          >
            Create
          </Button>
          <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Message"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Plz wait while processing is going on...
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
          </Dialog>
        </form>
      </div>
    </Container>
    </div>
    );
}