import * as React from "react"
import {Text,Icon} from "../shared"
import { withRouter, RouteComponentProps } from "react-router"
type Props=RouteComponentProps & {

}

class Header  extends React.Component<Props>{
    render(){
        const {history}=this.props
        return(
            <div className="header">
                <div id="logo" onClick={()=>{history.push("/")}}></div>
                <Text strong size="l">Tyrestore - Powered by my coffee</Text>
                <Icon name="basket" size="l" badge={4} onClick={()=>{history.push("/basket")}}></Icon>
            </div>
        )
    }
}
export default withRouter(Header)