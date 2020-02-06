import {SHOW_LOGIN_SIGNUP_MODAL, LOGIN_USER, LOGOUT_USER} from './constants';
import setAuthTokenAsHeader from '../utils/setAuthTokenAsHeader';


export function showLoginSignupModal(isShowing) {
    return {
        type: SHOW_LOGIN_SIGNUP_MODAL,
        payload: isShowing
    }
}

export function loginUser(userData) {
   return {
       type: LOGIN_USER,
       payload: userData
   }
}

export function logoutUser() {
    localStorage.removeItem('jwtToken');
    setAuthTokenAsHeader(null);
    return {
        type: LOGOUT_USER
    }
}