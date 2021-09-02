import React, { useState } from "react";
import * as allApis from "./api";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";

function App(){
    const [count,setCount] = useState();
    {allApis.callAPI1(setCount)}
    return (
        <div>
            <h1>{count}</h1>
        </div>
    );
}

export default App;