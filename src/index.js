import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import indexReducer from '../src/store/reducers/index-reducers';
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync'

const rootReducer = combineReducers({
    index: indexReducer,
})

const config = {}
const middlewares = [
  createStateSyncMiddleware(config),
]

const store = createStore(rootReducer,{},
    applyMiddleware(...middlewares)
    );
initStateWithPrevTab(store)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));