import * as ReactDOM from "react-dom";
import * as React from "react";
import { Router } from "react-router"
import { createBrowserHistory } from "history"
import "./styles.scss"

import App from "./components/app"
import { createStore } from "redux"
import { reducer } from "../redux/store"
import { Provider } from "react-redux";



 const store = createStore(reducer)
 
ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            <App />
        </Router>
    </Provider>
    , document.getElementById("app"));
