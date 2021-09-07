import React from "react";
import Home from "./Home.jsx";
import SignupLogin from "./Signup-Login.jsx";
import Profile from "./Profile.jsx";
import CreateTest from "./Create-Test.jsx";
import TakeTest from "./Take-Test.jsx";
import ViewQuestions from "./View-Questions.jsx";
import ViewSubmissions from "./View-Submissions.jsx"
import AddQuestion from "./Add-Question.jsx"
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
                    <Route path="/taketest" component={TakeTest}/>
                    <Route path="/viewquestions/:test_id" component={ViewQuestions}/>
                    <Route path="/viewsubmissions/:test_id" component={ViewSubmissions}/>
                    <Route path="/addquestion/:test_id" component={AddQuestion}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;