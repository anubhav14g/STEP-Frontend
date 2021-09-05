import React from "react";
import Home from "./Home.jsx";
import SingupLogin from "./Signup-Login.jsx";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";

function App(){
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/singuplogin" component={SingupLogin}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;