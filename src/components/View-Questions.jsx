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

export default function ViewQuestions(props){
    const test_id = props.match.params.test_id;
    const classes = useStyles();

    const [rowsData, setData]= useState();
    
    function callGetAPI(){
        axios.get(`https://anubhavg-step.herokuapp.com/api/test/view/all/questions/${test_id}`,{ headers: {"auth-token" : `${localStorage.getItem('step-user-auth-token')}`}}).then(res=>{   
        // console.log(res.data['all_tests'])    
            setData(res.data['allQuestions'])
        }).catch(err=>{
            console.log(err);
        });
    }

    function callGetDownloadAPI(){
        axios(`https://anubhavg-step.herokuapp.com/api/test/create/pdf/questions/test/${test_id}`,{
            method: "GET",
            responseType: "blob"
            //Force to receive data in a Blob Format
          },{ headers: {"auth-token" : `${localStorage.getItem('step-user-auth-token')}`}}).then(response=>{       
            const file = new Blob([response.data], {
                type: "application/pdf"
              });
              //Build a URL from the file
              const fileURL = URL.createObjectURL(file);
              //Open the URL on new Window
              window.open(fileURL);
        }).catch(err=>{
            console.log(err);
        });
    }

    return (
        <div>
            <Navbar/>
            <Button onClick={callGetAPI} variant="contained" color="secondary" style={{marginTop:"20px",marginLeft:10,width: "270px",
            height: "50px",color: '#FFFFFF',fontSize:'19px'}}><b>View Questions</b></Button>
            <Button onClick={callGetDownloadAPI} variant="contained" color="secondary" style={{marginTop:"20px",marginLeft:10,width: "270px",
            height: "50px",color: '#FFFFFF',fontSize:'19px'}}><b>Download Pdf</b></Button>
            {rowsData && rowsData.map((row) => (
            <TableContainer component={Paper} style={{marginTop: "60px",border: "solid 1px black"}}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="center"><h2>Question</h2></TableCell>
                <TableCell align="center"><h2>option1</h2></TableCell>
                <TableCell align="center"><h2>option2</h2></TableCell>
                <TableCell align="center"><h2>option3</h2></TableCell>
                <TableCell align="center"><h2>option4</h2></TableCell>
                <TableCell align="center"><h2>solution</h2></TableCell>
                <TableCell align="center"><h2>Created At</h2></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                <TableCell align="center">{row.question}</TableCell>
                <TableCell align="center">{row.option1}</TableCell>
                <TableCell align="center">{row.option2}</TableCell>
                <TableCell align="center">{row.option3}</TableCell>
                <TableCell align="center">{row.option4}</TableCell>
                <TableCell align="center">{row.solution}</TableCell>
                <TableCell align="center">{row.createdAt}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </TableContainer>
        ))}
        </div>
    )
}