import * as React from "react"
import {Route, withRouter, RouteComponentProps} from "react-router"
import {createBrowserHistory} from "history"    
import Button from "./button"
import { StoreType } from "../../redux/store"
import { connect } from "react-redux"
import { Dispatch } from "redux"

type Props=RouteComponentProps &
{
    counter?:number,
    increment?:() => void,
    decrement?:() => void
}

class App extends React.Component<Props>{
    handleHomeClick(){
        this.props.history.push("/home");
    }
    handleSignInClick(){
        this.props.history.push("/login");
    }
    handleCartClick(){
        this.props.history.push("/cart");
    }
    handleIncrement(){
        //if(this.props.increment)
        this.props.increment?.()
    }
    handleDecrement(){
        this.props.decrement?.()
    }


    render(){
        var time=Date.now()
        var t1=new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(time);
        return(
            <div>
                
                <div className="navigator">
                <Button onClick={this.handleHomeClick.bind(this)}>Home</Button>
                <Button onClick={this.handleSignInClick.bind(this)}>LogIn</Button>
                <Button onClick={this.handleCartClick.bind(this)}>Cart</Button>
                </div>
               <div>
                    <Route path="/home">
                         <h3>{this.props.counter}</h3 >
                        <div>Home Route</div>
                        <Button onClick={this.handleIncrement.bind(this)}>Increment</Button>
                        <Button onClick={this.handleDecrement.bind(this)}>Decrement</Button>
                    </Route>
                    <Route path="/login">
                        <div>Login Route</div>
                    </Route>
                    <Route path="/signin">
                        <div>SignIn Route</div>
                    </Route>
                    <Route path="/cart">
                        <div>Cart Route</div>
                    </Route>
                </div>
            </div>
        )
    }
}

function mapStateToProps(store:StoreType,props:Props){
    return{
        ...props,
        counter:store.counter
    }
}

function mapDispatchToProps(dispatch:Dispatch,props:Props){
    return{
        ...props,
        increment:()=>dispatch({type:"Increment"}),
        decrement:()=>dispatch({type:"Decrement"})  
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App))