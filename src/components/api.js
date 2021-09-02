import axios from 'axios';

export function callAPI1(changeFunction){
    axios.get('https://anubhavg-step.herokuapp.com/').then(res=>{   
        changeFunction(res.data.message)
    });
}
