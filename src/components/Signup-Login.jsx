import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import Navbar from "./Navbar.jsx";
import SignUp from "./Signup.jsx";
import Login from "./Login.jsx";

export default function SignupLogin(){
    return (
        <div>
            <Navbar/>
            <Link to="/" style={{ textDecoration: 'none' }}><Button variant="contained" color="secondary" style={{marginTop:"10px",marginLeft:10,width: "170px",
  height: "50px",color: '#FFFFFF',fontSize:'19px'}}><b>Home</b></Button></Link>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <SignUp/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Login/>
                </Grid>
            </Grid>
        </div>
    )
}