import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  FETCH_GROUPS,
  LOGIN_USER,
  SET_USER,
  CREATE_GROUP,
  ADD_GROUP_MESSAGES
} from '../actions/constants';
import {
  showCreateGroupModal,
  updateGroups,
  fetchGroups
} from '../actions/groupActions';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import setAuthToken from '../utils/setAuthTokenAsHeader';
import jwt_decode from 'jwt-decode';

/* Fetch All Groups */
function fetchGroupsFromApi() {
  return axios.get('/api/group');
}

function* fetchGroupsList() {
  const response = yield call(fetchGroupsFromApi);
  console.log('Groups', response);
  yield put(updateGroups(response.data));
}

/* Create Group */
function callCreteGroupApi(name) {
  return axios.post('/api/group/create', { name });
}

function* createGroup(action) {
  const response = yield call(callCreteGroupApi, action.payload);
  console.log(response);
  yield put(fetchGroups());
}

/* Login User */
function callLoginApi(userData) {
  return axios.post('/api/user/login', userData, {
    validateStatus: function(status) {
      return status >= 200 && status < 500;
    }
  });
}

function* loginUser(action) {
  try {
    const response = yield call(callLoginApi, action.payload);
    console.log(response);
    if (response.status === 200) {
      const token = response.data.token;
      //Save token in local storage
      localStorage.setItem('jwtToken', token);
      //Set token as axios header
      setAuthToken(token);
      // Save user in store
      console.log('token decode', jwt_decode(token));
      yield put({ type: SET_USER, payload: jwt_decode(token) });
    }
  } catch (e) {
    console.log('Err', e);
  }
}

// Add Message
function callAddMessageApi(groupId, content) {
  return axios.post(`/api/group/addMessage/${groupId}`, { content });
}

function* addMessage(action) {
  const { groupId, content } = action.payload;
  const response = yield call(callAddMessageApi, groupId, content);
  console.log('Add Message', response);
  yield put(fetchGroups());
}

function* mySaga() {
  yield takeLatest(FETCH_GROUPS, fetchGroupsList);
  yield takeLatest(LOGIN_USER, loginUser);
  yield takeLatest(CREATE_GROUP, createGroup);
  yield takeLatest(ADD_GROUP_MESSAGES, addMessage);
}

export default mySaga;
