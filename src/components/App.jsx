import React, { useState } from "react";
import * as allApis from "./api";
import Home from "./Home.jsx";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";

function App(){
    return (
        <div>
            <Home/>
        </div>
    );
}

export default App;