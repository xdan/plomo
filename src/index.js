import 'core-js/es6/map';
import 'core-js/es6/set';

import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import { AppContainer } from 'react-hot-loader'

let root = document.getElementById("root");

function render() {
    ReactDOM.render(<AppContainer><App /></AppContainer>, root);
}

render();

if (module.hot) {
    module.hot.accept('./App', render)
}