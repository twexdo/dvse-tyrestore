import * as React from "react"
import { Button, Text } from "../shared"
import { withRouter, RouteComponentProps } from "react-router"
type Props =RouteComponentProps & {

}
class Signin extends React.Component<Props>{
    render() {
        const {history } = this.props
        return (
            <div className="signin">
                <div className="form">
                        <div><input type="text" placeholder="Username" /></div>
                        <div><input type="text" placeholder="Mail / Phone Number" /></div>
                        <div><input type="password" placeholder="Passwsord" /></div>
                        <div><Button longButton skin="primary" hoverSkin="success" onClick={()=>{history.push('/signin')} }>SignIn</Button></div>
                </div>
            </div>
        )
    }
}

export default withRouter(Signin)