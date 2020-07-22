import * as React from "react"
import {Text,Icon} from "../shared"
import { withRouter, RouteComponentProps } from "react-router"
import { StoreType } from "../../buisness/model"
import { connect } from "react-redux"
import { BasketTires } from "../../data/models"
type Props=StoreProps & RouteComponentProps & {

}
type StoreProps={
    basket:BasketTires[]
}
class Header  extends React.Component<Props>{

    calculate():number{
        let x=0
        this.props.basket.forEach(element =>{
            
            x+=element.amount

        })
        if(x){return x}
        else{return -20}
    }

    render(){
        const {history}=this.props
        return(
            <div className="header">
                <div id="logo" onClick={()=>{history.push("/")}}></div>
                <Text strong size="l">Tirestore - Powered by my coffee</Text>
                <div>   
                <Icon name="user" size="l" onClick={()=>{history.push("/login")}}></Icon>
                <Icon name="basket" size="l" badge={this.calculate()} onClick={()=>{history.push("/basket")}}></Icon>
                </div>
            </div>
        )
    }
}
function mapStateToProps(store:StoreType):StoreProps{
    return{
        basket:store.basket.items
    }

}
export default connect(mapStateToProps)(withRouter(Header))