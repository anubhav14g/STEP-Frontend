import React from "react";
import Home from "./Home.jsx";
import SignupLogin from "./Signup-Login.jsx";
import Profile from "./Profile.jsx";
import CreateTest from "./Create-Test.jsx";
import ViewQuestions from "./View-Questions.jsx";
import ViewSubmissions from "./View-Submissions.jsx"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";

function App(){
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/signuplogin" component={SignupLogin}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/createtest" component={CreateTest}/>
                    <Route path="/viewquestions/:test_id" component={ViewQuestions}/>
                    <Route path="/viewsubmissions/:test_id" component={ViewSubmissions}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;