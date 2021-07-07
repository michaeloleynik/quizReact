import {AUTH_SUCCESS, AUTH_LOGOUT} from './actionTypes';

import axios from 'axios';

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email, password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPCUiZ9RXe3U7cQRQ3KD6WZNnwb1YfMYc';

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPCUiZ9RXe3U7cQRQ3KD6WZNnwb1YfMYc';
        }

        const res = await axios.post(url, authData);
        const data = res.data;
        console.log(data);

        const exparationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userID', data.localId);
        localStorage.setItem('exparationDate', exparationDate);

        dispatch(authSuccess(data.idToken));
        dispatch(autoLogout(data.expiresIn));
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
           dispatch(logout()); 
        }, time * 1000);
    }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('exparationDate');

    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token');

        if (!token) {
            dispatch(logout());
        } else {
            const exparationDate = new Date(localStorage.getItem('exparationDate'));
            if (exparationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(autoLogout(exparationDate.getTime() - new Date().getTime() / 1000));
            }
        }
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}