import React, { useState } from 'react';
import Navbar from "./Navbar.jsx";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as allApis from "./api";
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import axios from 'axios';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

export default function TakeTest(){
    
    const classes = useStyles();

    const [isOpened, setIsOpened] = useState(false);
    
    const [message,setMessage] = useState()

    const [rowsData, setData]= useState();
    
    const [state,setState] = useState({
        test_id : ''
    });

    const handleInputChange = (event) => {
        setState((prevProps) => ({
            ...prevProps,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(state.test_id);
        axios.get(`https://anubhavg-step.herokuapp.com/api/test/check/status/${state.test_id}`,{ headers: {"auth-token" : `${localStorage.getItem('step-user-auth-token')}`}}).then(res=>{   
        // console.log(res.data['all_tests'])    
            axios.get(`https://anubhavg-step.herokuapp.com/api/test/view/all/questions/${state.test_id}`,{ headers: {"auth-token" : `${localStorage.getItem('step-user-auth-token')}`}}).then(res=>{   
            // console.log(res.data['all_tests'])    
                setData(res.data['allQuestions'])
                setIsOpened(false);
            }).catch(err=>{
                console.log(err.response.data.message);
                setIsOpened(true);
                setMessage(err.response.data.message)
            });
        }).catch(err=>{
            console.log(err.response.data.message);
            setIsOpened(true);
            setMessage(err.response.data.message)
        });
    };

    const [currQuesId,setCurrQuesId] = useState()

    const [state2,setState2] = useState({
        submitted_answer : ''
    });

    // const handleSaveInputChange = (event) => {
    //     setState2((prevProps) => ({
    //         ...prevProps,
    //         [event.target.name]: event.target.value
    //     }));
    // };

    const handleSaveSubmit = (event) => {
        event.preventDefault();
        axios.get(`https://anubhavg-step.herokuapp.com/api/test/check/status/${state.test_id}`,{ headers: {"auth-token" : `${localStorage.getItem('step-user-auth-token')}`}}).then(res=>{   
        // console.log(res.data['all_tests'])    
            axios.post(`https://anubhavg-step.herokuapp.com/api/submit/save/answer/${currQuesId}`,{'submitted_answer': state2.submitted_answer},{ headers: {"auth-token" : `${localStorage.getItem('step-user-auth-token')}`}}).then(res=>{   
            // console.log(res.data['all_tests'])    
                setIsOpened(true);
                setMessage(res.data.message)
            }).catch(err=>{
                console.log(err.response.data.message);
                setIsOpened(true);
                setMessage(err.response.data.message)
            });
        }).catch(err=>{
            console.log(err.response.data.message);
            setIsOpened(true);
            setMessage(err.response.data.message)
        });
    };

    function handleSubmitTheTest(){
        // console.log(state.test_id);
        axios.get(`https://anubhavg-step.herokuapp.com/api/test/check/status/${state.test_id}`,{ headers: {"auth-token" : `${localStorage.getItem('step-user-auth-token')}`}}).then(res=>{   
        // console.log(res.data['all_tests'])    
            axios.get(`https://anubhavg-step.herokuapp.com/api/submit/test/submit/${state.test_id}`,{ headers: {"auth-token" : `${localStorage.getItem('step-user-auth-token')}`}}).then(res=>{   
                setMessage(res.data.message)   
                setIsOpened(true);
            }).catch(err=>{
                console.log(err.response.data.message);
                setIsOpened(true);
                setMessage(err.response.data.message)
            });
        }).catch(err=>{
            console.log(err.response.data.message);
            setIsOpened(true);
            setMessage(err.response.data.message)
        });
    }
    
    return (
        <div>
            <Navbar/>
            {isOpened && <Button variant="contained" color="secondary" style={{marginTop:"10px",marginLeft:"0px",width: "570px",
  height: "100px",color: '#FFFFFF',fontSize:'19px'}}><b>{message}</b></Button> }
            <form onSubmit={handleSubmit} noValidate>
                <input
                style={{marginTop:"30px",marginLeft:10,height: '30px',width: '330px',fontSize: '20px'}}
                id="test_id"
                placeholder="Enter Test ID"
                name="test_id"
                value={state.test_id}
                onChange={handleInputChange}
                autoFocus
                />
                <Button
                    type="submit"
                    style={{marginTop:"0px",marginLeft:10,width: "100px",
                height: "40px",color: '#FFFFFF',fontSize:'19px'}}
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                >
                Take
                </Button>
            </form>
            <div style={{marginTop:"100px"}}>
            <TableContainer component={Paper} style={{marginTop: "30px",border: "solid 1px black"}}>
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="center"><h2>Question</h2></TableCell>
                <TableCell align="center"><h2>option1</h2></TableCell>
                <TableCell align="center"><h2>option2</h2></TableCell>
                <TableCell align="center"><h2>option3</h2></TableCell>
                <TableCell align="center"><h2>option4</h2></TableCell>
                <TableCell align="center"><h2>Your Answer</h2></TableCell>
                <TableCell align="center"></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rowsData && rowsData.map((row) => (
                <TableRow>
                <TableCell align="center">{row.question}</TableCell>
                <TableCell align="center">{row.option1}</TableCell>
                <TableCell align="center">{row.option2}</TableCell>
                <TableCell align="center">{row.option3}</TableCell>
                <TableCell align="center">{row.option4}</TableCell>
                <TableCell align="center">
                    <form onSubmit={handleSaveSubmit} noValidate>
                    <input
                    style={{marginTop:"30px",marginLeft:10,height: '30px',width: '330px',fontSize: '20px'}}
                    id="submitted_answer"
                    placeholder="Enter Your Answer"
                    name="submitted_answer"
                    value={state.submitted_answer}
                    onChange={(event) => {
                        setCurrQuesId(row._id)
                        setState2((prevProps) => ({
                        ...prevProps,
                        [event.target.name]: event.target.value
                        }));
                            }}
                    autoFocus
                    />
                    <Button
                        type="submit"
                        style={{marginTop:"0px",marginLeft:10,width: "100px",
                    height: "40px",color: '#FFFFFF',fontSize:'19px'}}
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                    Save
                    </Button>
                    </form>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
            </Table>
            </TableContainer>
            </div>
            <Button onClick={handleSubmitTheTest} variant="contained" color="secondary" style={{marginTop:"10px",marginLeft:"20px",width: "300px",
  height: "40px",color: '#FFFFFF',fontSize:'19px'}}><b>Submit the Test</b></Button>
        </div>
    )
}