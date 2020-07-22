import * as React from "react"
import { Button, Text } from "../shared"
import { withRouter, RouteComponentProps } from "react-router"
type Props =RouteComponentProps & {

}
class Login extends React.Component<Props>{
    render() {
        const {history } = this.props
        return (
            <div className="login">
                <div className="form">
                        <div><input type="text" placeholder="Username" /></div>
                        <div><input type="password" placeholder="Password" /></div>
                        <div><Button longButton hoverSkin="success" >LogIn</Button></div>
                        <div><Button longButton skin="highlight" onClick={()=>{history.push('/signin') /* de ce are delay?*/} }>SignIn</Button></div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)