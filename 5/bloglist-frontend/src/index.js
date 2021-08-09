import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import store from './store'
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
    
    <Provider store={store}>
        
        <Router>
        <head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </head>
            <App />
        </Router>  
    </Provider>, document.getElementById('root'));