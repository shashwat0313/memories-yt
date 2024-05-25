import { Axios } from 'axios';
import * as api from '../api'
import { AUTH } from '../constants/actionTypes'

export function signin(formData, history) {
    return async (dispatch) => {
        try {
            console.log("formdata: ", formData);
            const response = await api.signin(formData)
            console.log("signin response.data:", response.data);
            
            dispatch({type:AUTH, data:response.data})
            
            // attempt to log in the user

            // ... 

            //send to home
            history.push('/')

        } catch (error) {

        }
    }
}

export function signup(formData, history) {
    return async (dispatch) => {
        try {
            console.log("formdata: ", formData);
            // attempt to log in the user

            const response = await api.signup(formData)
            console.log("signup response - ",response);

            dispatch({type:AUTH, data:response.data})
            
            // ... 

            //send to home
            history.push('/')

        } catch (error) {

        }
    }
}