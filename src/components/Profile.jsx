import React from 'react';
import Navbar from "./Navbar.jsx";
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

export default function Header(){
    
    function logout(){
        localStorage.removeItem('step-user-auth-token');;
    }

    return(
    <div>
        <Navbar/>
        <Link to="/" style={{ textDecoration: 'none'}}><Button onClick={logout} variant="contained" color="secondary" style={{marginTop:"10px",marginLeft:10,width: "170px",
  height: "50px",color: '#FFFFFF',fontSize:'19px'}}><b>Log Out</b></Button></Link>
    </div>
    );
}