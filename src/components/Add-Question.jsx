import React, { useState } from 'react';
import Navbar from "./Navbar.jsx";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {BrowserRouter as Router,Route,Redirect,Switch} from "react-router-dom";
import axios from 'axios';

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

export default function AddQuestion(props){
    
    const test_id = props.match.params.test_id;
    
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
        question : '',
        option1 : '',
        option2 : '',
        option3 : '',
        option4 : '',
        solution : ''
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
        axios.post(`https://anubhavg-step.onrender.com/api/test/add/question/${test_id}`,state,{ headers: {"auth-token" : `${localStorage.getItem('step-user-auth-token')}`}}).then(res=>{   
            setMessage(res.data.message)
            setIsOpened(true)
            setErrorMessage(false)
        }).catch(err=>{
            // console.log(err.response.data);
            setMessage(err.response.data.message)
            setIsOpened(true)
            setErrorMessage(true)
        });
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
          Add Question...
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="question"
            label="Question"
            name="question"
            value={state.question}
            onChange={handleInputChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="option1"
            label="Option-1"
            name="option1"
            value={state.option1}
            onChange={handleInputChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="option2"
            label="Option-2"
            name="option2"
            value={state.option2}
            onChange={handleInputChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="option3"
            label="Option-3"
            name="option3"
            value={state.option3}
            onChange={handleInputChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="option4"
            label="Option-4"
            name="option4"
            value={state.option4}
            onChange={handleInputChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="solution"
            label="Solution"
            name="solution"
            value={state.solution}
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
            Add
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