import * as React from "react"
import { Icon } from ".."
import { Vehicle } from "../../../data/models"
import ReactDOM = require("react-dom")

type Props={
    list:any[]
    fun(key:string): void
}
type State={
    text_:string
}
class SearchBar extends React.Component<Props,State>{
    constructor(props){
        super(props)
        this.state={
            text_:""
        }
    }
    handleEnter(e) {
        if (e.key === 'Enter') {
           this.props.fun(e.target.value)
        }
    }
    handleTyping(e){
        this.setState({
            text_:e.target.value
        })
    }

    handleOnSearchIconClick(){
        this.props.fun(this.state.text_)
    }
    handleBackIconClick(){
        this.props.fun("")
    }
    render(){
        return(
            <div onKeyDown={this.handleEnter.bind(this)} className="search-container">
                <div>
                <Icon onClick={this.handleBackIconClick.bind(this)} name="back-arrow"></Icon>
            </div>
            <input type="text" placeholder="SEARCH_BAR" className="bar" onKeyUp={this.handleTyping.bind(this)}/>
            <div>
                <Icon onClick={this.handleOnSearchIconClick.bind(this)} name="search"></Icon>
            </div>
            </div>
        )
    }
}
export default SearchBar