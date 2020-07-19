import { createBrowserHistory } from "history"
import * as React from "react"
import * as ReactDom from 'react-dom'
import "./styles.scss"
import { Button, Text, Icon } from "./components/shared"
import Header from "./components/header/component"
import { Router, Route, Switch } from "react-router"
import Home from "./components/home/component"
import Basket from "./components/basket/component"
import { createStore } from "redux"
import { reducer } from "./buisness/reducer"
import { Provider } from "react-redux"


const history = createBrowserHistory()

const store=createStore(reducer)

function startApp() {
    return (
        <Provider store={store}>
        <Router history={history}>
            <Header ></Header>
            <Switch>
                <Route path="/basket">
                    <Basket></Basket>
                </Route>

                <Route path="/">
                    <Home></Home>
                </Route>
                
            </Switch>
        </Router>
        </Provider>
    )
}

ReactDom.render(
    startApp(), document.getElementById("app"))