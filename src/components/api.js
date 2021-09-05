import axios from 'axios';

export function callAPI1(changeFunction){
    axios.get('https://anubhavg-step.herokuapp.com/').then(res=>{   
        changeFunction(res.data.message)
    });
}

export function callAPI2(bodyObj,setMessageFunction,setIsOpenedFunction){
    axios.post('https://anubhavg-step.herokuapp.com/api/auth/register/user',bodyObj).then(res=>{   
        setMessageFunction(res.data.message)
        setIsOpenedFunction(true)
        // console.log(res.data.message);
    }).catch(err=>{
        // console.log(err.response.data);
        setMessageFunction(err.response.data.message)
        setIsOpenedFunction(true)
    });
}

export function callAPI3(bodyObj,setMessageFunction,setIsOpenedFunction){
    axios.post('https://anubhavg-step.herokuapp.com/api/auth/login/user',bodyObj).then(res=>{   
        setMessageFunction(res.data.message)
        setIsOpenedFunction(true)
        // console.log(res.data.message);
        // console.log(res.data['auth-token']);
    }).catch(err=>{
        // console.log(err.response.data);
        setIsOpenedFunction(true)
        setMessageFunction(err.response.data.message)
    });
}
