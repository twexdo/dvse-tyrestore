import { createBrowserHistory } from "history"
import * as React from "react"
import * as ReactDom from 'react-dom'
import "./styles.scss"
import { Button, Text, Icon, DropDownDots } from "./components/shared"
import Header from "./components/header/component"
import { Router, Route, Switch } from "react-router"
import Home from "./components/home/component"
import Basket from "./components/basket/component"
import Login  from "./components/login/component"
import Signin  from "./components/signin/component"
import { createStore } from "redux"
import { reducer } from "./buisness/reducer"
import { Provider } from "react-redux"
import SearchBar from "./components/shared/searchBar/component"


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

                <Route path="/login">
                    <Login></Login>
                </Route>

                <Route path="/signin">
                    <Signin></Signin>
                </Route>

                <Route path="/test">
                    <SearchBar/>
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