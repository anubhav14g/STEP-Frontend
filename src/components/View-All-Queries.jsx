import React, { useState } from 'react';
import Navbar from "./Navbar.jsx";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 650,
  },
}));


export default function ViewAllQueries(){
    
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const [rowsData, setData]= useState();

    function callGetAPI(){
        {allApis.callAPI6(setData)}
    }

    return(
    <div>
        <Navbar/>
        <Button onClick={callGetAPI} variant="contained" color="secondary" style={{marginTop:"20px",marginLeft:10,width: "270px",
            height: "50px",color: '#FFFFFF',fontSize:'19px'}}><b>View Queries</b></Button>
        <TableContainer component={Paper} style={{marginTop: "60px"}}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
            {rowsData && rowsData.map((row,index) => (
                <div className={classes.root}>
                    <Accordion expanded={expanded === index} onChange={handleChange(index)}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        >
                        <Typography className={classes.heading} style={{fontSize: "20px", color: 'red'}}><b>Query related to Test ID</b></Typography>
                        <Typography className={classes.secondaryHeading} style={{fontSize: "20px"}}>{row.test_id}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            {row.query}
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            ))}
            </TableRow>
            </TableHead>
        </Table>
        </TableContainer>
    </div>
    );
}