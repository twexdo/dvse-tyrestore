import * as React from "react"

type Props={
    skin?:string,
    onClick:() => void
}
 class Button extends React.Component<Props>{ 
     
 /*    handleClick(){
            this.props.history.push("/home");
    } */

    render(){
        var color=this.props.skin=="primary" ? "red" :"blue"
        return(
            <div>
                <button style={{ backgroundColor: color}} onClick={this.props.onClick.bind(this)} >
                    { this.props.children}
                </button>
            </div>
        )
    }
}
export default Button