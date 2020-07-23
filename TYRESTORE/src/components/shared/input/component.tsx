import * as React from "react"
import { Text } from "../index"
import { BasketTires } from "../../../data/models"
type Props = {
    addFunc(): void
    removeFunc(): void
    value: any
    tire: BasketTires

}
type State = {
    clicked: boolean
}

class Input extends React.Component<Props, State>{
    constructor(props) {
        super(props)
        this.state = {
            clicked: false
        }
    }

    handleClick() {
        this.setState({
            clicked: !this.state.clicked
        })
        console.log(this.state.clicked)
    }
    handleEnter(e) {
        if (e.key === 'Enter') {
            this.setState({
                clicked: !this.state.clicked
            })
            //alert(e.target.value)
            if (e.target.defaultValue < e.target.value) {
                if (e.target.value <= this.props.tire.stock) {
                    for (let i = e.target.defaultValue; i < e.target.value; i++) {
                        this.props.addFunc()
                    }
                }
                else {
                    alert("This amount exceeds the value of our stock")
                }
            }else if (e.target.defaultValue > e.target.value) {
                if (e.target.value >= 0) {
                    for (let i = e.target.value; i < e.target.defaultValue; i++) {
                        this.props.removeFunc()
                    }
                } else {
                    alert("Negative number not permited")
                }
            }
        }
    }

    render() {
        return (
            <div className="input">
                {!this.state.clicked && <div onClick={this.handleClick.bind(this)}><Text>{this.props.value}</Text></div>}
                {this.state.clicked && <input type="number" onKeyDown={this.handleEnter.bind(this)} defaultValue={this.props.value} ></input>}
            </div>

        )
    }
}
export default Input