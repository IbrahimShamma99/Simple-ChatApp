import {combineReducers} from 'redux';
import GroupReducer from './GroupReducer';
import AuthReducer from './AuthReducer';

export const rootReducer =  combineReducers({
    groups: GroupReducer,
    auth: AuthReducer

})
