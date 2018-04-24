import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/fn/object/assign';
import 'core-js/es6/promise';

import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import { AppContainer } from 'react-hot-loader'
import {PureApp} from "./components/pure/App";

let root = document.getElementById("root");
let pureapp = new PureApp(document.getElementById("root2"));

function render() {
    ReactDOM.render(<AppContainer><App /></AppContainer>, root);
    pureapp.render();
}

render();

if (module.hot) {
    module.hot.accept('./App', render)
}