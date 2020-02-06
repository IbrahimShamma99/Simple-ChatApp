import {SHOW_LOGIN_SIGNUP_MODAL,SET_USER,LOGOUT_USER} from '../actions/constants'

const initialState = {
    isShowingLoginSignupModal: false,
    isAuthenticated: false,
    user: {}
}

export default function(state = initialState, action){
    switch(action.type) {
        case SHOW_LOGIN_SIGNUP_MODAL:
        return Object.assign({}, state, {
            isShowingLoginSignupModal: action.payload
        })

        case SET_USER: 
        return Object.assign({},state, {
            isAuthenticated: true,
            user: action.payload,
            isShowingLoginSignupModal: false
        })

        case LOGOUT_USER:
        return Object.assign({},state,{
            isAuthenticated: false,
            user: {}
        })

        default:
        break;

    }

    return state;
}