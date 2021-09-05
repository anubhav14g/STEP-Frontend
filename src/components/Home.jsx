import React, { useState } from 'react';
import Navbar from "./Navbar.jsx";
import HomeInfo from "./Home-Info.jsx";
import {BrowserRouter as Router,Route,Redirect,Switch} from "react-router-dom";
  
export default function Header(){

    return(
    <div>
        {localStorage.getItem('step-user-auth-token') && <Redirect to="/profile"/>}
        <Navbar/>
        <HomeInfo/>
    </div>
    );
}