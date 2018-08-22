import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import {donationsReducer} from './Reducers/main'


const userAction = {
    type:'updateUser',
    payload:{
        user:'sam'
    }
}

// function productsReducer (state = [], action) {
//         console.log(action.type)

//     return state;
// }
function usersReducer (state = "", action) {
    switch(action.type) {
        case 'updateUser':
        return action.payload

        default:
        return state;
    }
    
}

const allReducers = combineReducers({
    user:usersReducer,
    donations:donationsReducer
})

const store = createStore(
    allReducers,{
        donations:[{name:"sam",amount:5000}],
        user:"josh"
    },
    window.devToolsExtension && window.devToolsExtension()
)


ReactDOM.render(<Provider store={store}><App /></Provider>
, document.getElementById('root'));
// registerServiceWorker();
