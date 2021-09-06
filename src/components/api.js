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
        localStorage.removeItem('step-user-auth-token');
        // console.log(res.data.message);
    }).catch(err=>{
        // console.log(err.response.data);
        setMessageFunction(err.response.data.message)
        setIsOpenedFunction(true)
        localStorage.removeItem('step-user-auth-token');
    });
}

export function callAPI3(bodyObj,setMessageFunction,setIsOpenedFunction,setErrorMessageFunction){
    axios.post('https://anubhavg-step.herokuapp.com/api/auth/login/user',bodyObj).then(res=>{   
        setMessageFunction(res.data.message)
        setIsOpenedFunction(true)
        setErrorMessageFunction(false)
        // console.log(res.data.message);
        // console.log(res.data['auth-token']);
        localStorage.removeItem('step-user-auth-token');
        localStorage.setItem('step-user-auth-token', res.data['auth-token'])
    }).catch(err=>{
        // console.log(err.response.data);
        setIsOpenedFunction(true)
        setMessageFunction(err.response.data.message)
        setErrorMessageFunction(true)
        localStorage.removeItem('step-user-auth-token');
    });
}

export function callAPI4(setDataFunction){
    axios.get('https://anubhavg-step.herokuapp.com/api/test/view/all/tests',{ headers: {"auth-token" : `${localStorage.getItem('step-user-auth-token')}`}}).then(res=>{   
        // console.log(res.data['all_tests'])    
        setDataFunction(res.data['all_tests'])
    }).catch(err=>{
        console.log(err);
    });
}


export function callAPI5(bodyObj,setMessageFunction,setIsOpenedFunction,setErrorMessageFunction){
    axios.post('https://anubhavg-step.herokuapp.com/api/test/create',bodyObj,{ headers: {"auth-token" : `${localStorage.getItem('step-user-auth-token')}`}}).then(res=>{   
        setMessageFunction(res.data.message)
        setIsOpenedFunction(true)
        setErrorMessageFunction(false)
    }).catch(err=>{
        // console.log(err.response.data);
        setMessageFunction(err.response.data.message)
        setIsOpenedFunction(true)
        setErrorMessageFunction(true)
    });
}
