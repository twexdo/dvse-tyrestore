import * as React from "react"
import Text from "../shared/text/component"
import {Repository} from "../../data/repositories"
import { Tyre, Vehicle } from "../../data/models"
type Props={

}
type State={
    vehicles:Vehicle[]

}

class Home  extends React.Component<Props,State>{

    constructor (props:Props){
        super(props)
        this.state={
            vehicles:[]
        }
    }
    componentDidMount(){
        Repository.getAllVehicles().then(
            vehicles=>{this.setState({vehicles}) 
            console.log(vehicles)
        }
        )
    }

    render(){
        return(
            <div>
                <Text>HOME (1:46:16)</Text>
                {this.state.vehicles.map(v =><div>{v.name}</div>)}
            </div>

        )
    }
}
export default Home