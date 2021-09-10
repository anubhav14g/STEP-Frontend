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
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import axios from 'axios';

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

    const [message,setMessage] = useState()

    const [isOpened,setIsOpened] = useState(false)

    return(
    <div>
        <Navbar/>
        <Button onClick={callGetAPI} variant="contained" color="secondary" style={{marginTop:"10px",marginLeft:'10px',width: "270px",
            height: "50px",color: '#FFFFFF',fontSize:'19px'}}><b>View Queries</b></Button>
        <Link to="/postquery" style={{ textDecoration: 'none' }}><Button onClick={callGetAPI} variant="contained" color="secondary" style={{marginTop:"10px",marginLeft:'20px',width: "270px",
            height: "50px",color: '#FFFFFF',fontSize:'19px'}}><b>Post Query</b></Button></Link>
        <div>
        {isOpened && <Button variant="contained" color="secondary" style={{marginTop:"10px",marginLeft:'300px',width: "570px",
  height: "100px",color: '#FFFFFF',fontSize:'19px'}}><b>{message}</b></Button>}
        </div>
        <TableContainer component={Paper} style={{marginTop: "40px"}}>
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
                        {row.array && row.array.map((row2) => (
                        <AccordionDetails>
                        <Typography style={{color: '#ff00fd',width: '200px'}}>
                            <b>{row2.email}</b>     
                        </Typography>
                        <Typography style={{paddingLeft: '30px',width: '700px',color: '#2196f3'}}>
                            <b>{row2.query}</b>  
                        </Typography>
                        <Typography style={{paddingLeft: '30px'}}>
                            <button onClick={()=>{
                                axios.get(`https://anubhavg-step.herokuapp.com/api/query/update/upvote/${row2.query_id}`,{ headers: {"auth-token" : `${localStorage.getItem('step-user-auth-token')}`}}).then(res=>{      
                                    setMessage(res.data.message)
                                    setIsOpened(true);
                                }).catch(err=>{
                                    console.log(err.response.data.message);
                                    setMessage(err.response.data.message)
                                    setIsOpened(true);
                                });
                            }}><ThumbUpAltIcon/>{row2.upvote.length}</button>  
                        </Typography>
                        <Typography style={{paddingLeft: '30px'}}>
                            <button onClick={()=>{
                                axios.get(`https://anubhavg-step.herokuapp.com/api/query/update/downvote/${row2.query_id}`,{ headers: {"auth-token" : `${localStorage.getItem('step-user-auth-token')}`}}).then(res=>{      
                                            setMessage(res.data.message)
                                            setIsOpened(true);
                                        }).catch(err=>{
                                            console.log(err.response.data.message);
                                            setMessage(err.response.data.message)
                                            setIsOpened(true);
                                        });
                            }}><ThumbDownIcon/>{row2.downvote.length}</button>
                        </Typography>
                        <Typography style={{paddingLeft: '40px',color: 'red'}}>
                            <b>{row2.createdAt}</b>
                        </Typography>
                        </AccordionDetails>
                        ))}
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