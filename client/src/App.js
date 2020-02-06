import React from 'react';
import Dashboard from './components/dashboard';
import './App.css';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from './reducers';
import mySaga from './sagas';
import createSagaMiddleware from 'redux-saga';
import jwt_decode from 'jwt-decode'
import {logoutUser} from './actions/authActions'
import {SET_USER} from './actions/constants'
import setAuthToken from './utils/setAuthTokenAsHeader'
import {compose} from 'redux'

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
      applyMiddleware(sagaMiddleware)
    );
const store = createStore(rootReducer,enhancer);
sagaMiddleware.run(mySaga);

if(localStorage.getItem('jwtToken')) {
  const token = localStorage.getItem('jwtToken')
  const decoded = jwt_decode(token);
  const currentTime = Date.now()/1000;
  if(decoded.exp < currentTime){
    store.dispatch(logoutUser())
  } else {
    //Set token as axios header
    setAuthToken(token)
    // Save user in store
    store.dispatch({type:SET_USER,payload:jwt_decode(token)})
  }
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;
