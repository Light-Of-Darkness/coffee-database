import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Recipe from './components/recipe';
import Display from './components/display';

ReactDOM.render(<Recipe />, document.getElementById('root'));
ReactDOM.render(<Display />, document.getElementById('recipes'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
