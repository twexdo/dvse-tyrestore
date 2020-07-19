import * as React from "react"
import Text from "../shared/text/component"
import {Repository} from "../../data/repositories"
import { Tire, Vehicle } from "../../data/models"
import VehicleTable from "./vehicleTable/component"
import { StoreType } from "../../buisness/model"
import { connect, DispatchProp } from "react-redux"
import { Dispatch, bindActionCreators } from "redux"
import { IActions, Actions } from "../../buisness/actions"
import TiresTable from "./tiresTable/component"


type Props=StoreProps & DispatchProps & {

}
type StoreProps={
    vehiclesItems:Vehicle[]
    selectedVehicle?:Vehicle
    tires:Tire[],
    tiresLoading:boolean        

}
type DispatchProps={
    actions:IActions

}

class Home  extends React.Component<Props>{


    componentDidMount(){
        this.props.actions.vehiclesLoading()
        Repository.getAllVehicles().then(
            vehicles  => this.props.actions.vehiclesLoaded(vehicles)
        )
    }

    handleVehicleSelect(vehicle:Vehicle){
        this.props.actions.selectVehicle(vehicle)
        Repository.getTiresById(vehicle.id).then(
            tires=>{
               this.props.actions.tiresLoaded(tires)
            }
        )
    }

    handleTiresToBasket(tire:Tire){
        this.props.actions.addTireToBasket(tire)
    }


    render(){
        return(
            <div className="home">
                <VehicleTable 
                onSelectVehicle={this.handleVehicleSelect.bind(this)}
                vehicles={this.props.vehiclesItems}
                selectedVehicle={this.props.selectedVehicle}
                >

                </VehicleTable>

                {this.props.selectedVehicle &&
                    <TiresTable
                        tires={this.props.tires}
                        loading={this.props.tiresLoading}
                        onAddToBasket={this.handleTiresToBasket.bind(this)} 
                    ></TiresTable>
                
                }
                
                {/*{this.state.vehicles.map(v =><div>{v.name}</div>)}*/}
            </div>

        )
    }
}

function mapStateToProps(store:StoreType):StoreProps{
   return{
       vehiclesItems:store.vehicles.items,
       selectedVehicle:store.selectedVehicle,
       tires:store.tires.items,
       tiresLoading:store.tires.loading
   }
}

function  mapDispatchToProps(dispatch:Dispatch):DispatchProps{
    return{
        actions:{
            vehiclesLoading: () =>dispatch(Actions.vehiclesLoading()),
            //vehiclesLoaded: (vehicles:Vehicle[]) =>dispatch(Actions.vehiclesLoaded(vehicles))//mai usor de scris  

            vehiclesLoaded :bindActionCreators(Actions.vehiclesLoaded,dispatch),
            selectVehicle: bindActionCreators(Actions.selectVehicle,dispatch),
            tiresLoaded:bindActionCreators(Actions.tiresLoaded,dispatch),
            addTireToBasket:bindActionCreators(Actions.addTireToBasket,dispatch),
        }
    }   
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)