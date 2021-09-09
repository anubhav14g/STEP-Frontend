import React from 'react';
import Navbar from "./Navbar.jsx";
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import ProfileTable from "./Profile-Table.jsx";

export default function Profile(){
    
    function logout(){
        localStorage.removeItem('step-user-auth-token');
    }

    return(
    <div>
        <Navbar/>
        <Link to="/createtest" style={{ textDecoration: 'none'}}><Button variant="contained" color="secondary" style={{marginTop:"10px",marginLeft:"190px",width: "170px",
        height: "50px",color: '#FFFFFF',fontSize:'19px'}}><b>Create Test</b></Button></Link>
        <Link to="/taketest" style={{ textDecoration: 'none'}}><Button variant="contained" color="secondary" style={{marginTop:"10px",marginLeft:"10px",width: "170px",
        height: "50px",color: '#FFFFFF',fontSize:'19px'}}><b>Take Test</b></Button></Link>
        <Link to="/" style={{ textDecoration: 'none'}}><Button onClick={logout} variant="contained" color="secondary" style={{marginTop:"10px",marginLeft:"620px",width: "170px",
  height: "50px",color: '#FFFFFF',fontSize:'19px'}}><b>Log Out</b></Button></Link>
        <ProfileTable/>
    </div>
    );
}