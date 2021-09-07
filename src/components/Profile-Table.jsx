import React, { useState } from 'react';
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// function createData(Name, Type, Total_Questions, Start_Time, End_Time,Duration,Max_Marks,Created_At) {
//   return { Name, Type, Total_Questions, Start_Time, End_Time ,Duration,Max_Marks,Created_At};
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function ProfileTable() {
  const classes = useStyles();

  const [rowsData, setData]= useState();
  
  function callGetAPI(){
    {allApis.callAPI4(setData)}
  }

  return (
    <div>
        <Button onClick={callGetAPI} variant="contained" color="secondary" style={{marginTop:"70px",marginLeft:10,width: "170px",
        height: "50px",color: '#FFFFFF',fontSize:'19px'}}><b>Show Data</b></Button>
        <TableContainer component={Paper} style={{marginTop: "30px"}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><h2>Test Id</h2></TableCell>
            <TableCell align="center"><h2>Name</h2></TableCell>
            <TableCell align="center"><h2>Type</h2></TableCell>
            <TableCell align="center"><h2>Total Questions</h2></TableCell>
            <TableCell align="center"><h2>Start Time</h2></TableCell>
            <TableCell align="center"><h2>End Time</h2></TableCell>
            <TableCell align="center"><h2>Duration</h2></TableCell>
            <TableCell align="center"><h2>Max Marks</h2></TableCell>
            <TableCell align="center"><h2>Created At</h2></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsData && rowsData.map((row) => (
            <TableRow>
              <TableCell align="center">{row._id}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.type}</TableCell>
              <TableCell align="center">{row.total_questions}</TableCell>
              <TableCell align="center">{row.start_time}</TableCell>
              <TableCell align="center">{row.end_time}</TableCell>
              <TableCell align="center">{row.duration}</TableCell>
              <TableCell align="center">{row.max_marks}</TableCell>
              <TableCell align="center">{row.createdAt}</TableCell>
              <TableCell align="center"><Link to={`/viewquestions/${row._id}`} style={{ textDecoration: 'none'}}><Button variant="contained" color="secondary" style={{marginTop:"10px",marginLeft:10,width: "370px",
            height: "40px",color: '#FFFFFF',fontSize:'19px'}}><b>View All Questions</b></Button></Link></TableCell>
              <TableCell align="center"><Link to={`/addquestion/${row._id}`} style={{ textDecoration: 'none'}}><Button variant="contained" color="secondary" style={{marginTop:"10px",marginLeft:10,width: "370px",
            height: "40px",color: '#FFFFFF',fontSize:'19px'}}><b>Add Question</b></Button></Link></TableCell>
              <TableCell align="center"><Link to={`/viewsubmissions/${row._id}`} style={{ textDecoration: 'none'}}><Button variant="contained" color="secondary" style={{marginTop:"10px",marginLeft:10,width: "370px",
            height: "40px",color: '#FFFFFF',fontSize:'19px'}}><b>View All Submissions</b></Button></Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
