import {LOGIN, LOGOUT, AUTH} from '../constants/actionTypes'

export default function auth (state = {authData:localStorage.getItem('profile')}, action){
    switch (action.type) {
        //for manual log in
        case AUTH:
            console.log("auth data:", action);
            alert("auth data: " + JSON.stringify(action));
            localStorage.setItem('profile', JSON.stringify(action?.data))
            return {...state, authData:action?.data};
        
        // for google log in
        case LOGIN:
            console.log("auth data:", action);
            alert("auth data: " + JSON.stringify(action));
            localStorage.setItem('profile', JSON.stringify(action?.data))
            return {...state, authData:action?.data};
    
        case LOGOUT:
            console.log("received action type LOGOUT"); 
            localStorage.clear()
            return {...state, authData:null};
        default:
            return state;
    }
}