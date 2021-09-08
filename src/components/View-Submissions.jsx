import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Navbar from "./Navbar.jsx";
import axios from 'axios';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

export default function ViewSubmissions(props){
    const test_id = props.match.params.test_id;
    const classes = useStyles();

    const [rowsData, setData]= useState();
    
    function callGetAPI(){
        axios.get(`https://anubhavg-step.herokuapp.com/api/test/view/all/submissions/${test_id}`,{ headers: {"auth-token" : `${localStorage.getItem('step-user-auth-token')}`}}).then(res=>{   
        // console.log(res.data['all_tests'])    
            setData(res.data['allSubmissions'])
        }).catch(err=>{
            console.log(err);
        });
    }

    return (
        <div>
            <Navbar/>
            <Button onClick={callGetAPI} variant="contained" color="secondary" style={{marginTop:"70px",marginLeft:10,width: "270px",
            height: "50px",color: '#FFFFFF',fontSize:'19px'}}><b>View Submissions</b></Button>
            <TableContainer component={Paper} style={{marginTop: "30px",border: "solid 1px black"}}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="center"><h2>Name</h2></TableCell>
                <TableCell align="center"><h2>Email</h2></TableCell>
                <TableCell align="center"><h2>Type</h2></TableCell>
                <TableCell align="center"><h2>Submitted At</h2></TableCell>
                <TableCell align="center"><h2>Total Score</h2></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rowsData && rowsData.map((row) => (
                <TableRow>
                <TableCell align="center">{row.name_of_user}</TableCell>
                <TableCell align="center">{row.user_email}</TableCell>
                <TableCell align="center">{row.user_type}</TableCell>
                <TableCell align="center">{row.submitted_at}</TableCell>
                <TableCell align="center">{row.total_score}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
    )
}