import * as React from "react"
import {Text,Icon} from "../shared"
import { withRouter, RouteComponentProps } from "react-router"
import { StoreType } from "../../buisness/model"
import { connect } from "react-redux"
type Props=StoreProps & RouteComponentProps & {

}
type StoreProps={
    basketCount:number
}
class Header  extends React.Component<Props>{
    render(){
        const {history}=this.props
        return(
            <div className="header">
                <div id="logo" onClick={()=>{history.push("/")}}></div>
                <Text strong size="l">Tirestore - Powered by my coffee</Text>
                <Icon name="basket" size="l" badge={this.props.basketCount} onClick={()=>{history.push("/basket")}}></Icon>
            </div>
        )
    }
}
function mapStateToProps(store:StoreType):StoreProps{
    return{
        basketCount:store.basket.items.length
    }

}
export default connect(mapStateToProps)(withRouter(Header))