import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import configStore from "./redux/store";
// import  from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';


const {store} = configStore;
const {persistor} = configStore;
console.log(store);
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
            <App />
        </PersistGate>
    </Provider>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
