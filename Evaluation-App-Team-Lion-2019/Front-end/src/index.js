import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './helper/setAuthToken';
import  { setCurrentUser } from './actions/AuthAction';


document.body.classList.add('dark-gray');

if(localStorage.Token){
    setAuthToken(localStorage.Token);
    store.dispatch(setCurrentUser(jwt_decode(localStorage.Token)))
}

ReactDOM.render(
<Provider store ={store}>
<App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
