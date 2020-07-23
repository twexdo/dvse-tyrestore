import * as React from "react"
import Text from "../shared/text/component"
import { Repository } from "../../data/repositories"
import { Tire, Vehicle, BasketTires, OrderTypes } from "../../data/models"
import VehicleTable from "./vehicleTable/component"
import { StoreType } from "../../buisness/model"
import { connect, DispatchProp } from "react-redux"
import { Dispatch, bindActionCreators } from "redux"
import { IActions, Actions } from "../../buisness/actions"
import TiresTable from "./tiresTable/component"


type Props = StoreProps & DispatchProps & {

}
type StoreProps = {
    vehiclesItems: Vehicle[]
    selectedVehicle?: Vehicle
    tires: Tire[],
    tiresLoading: boolean
    basketItems: BasketTires[]

}
type DispatchProps = {
    actions: IActions

}

class Home extends React.Component<Props>{
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.actions.vehiclesLoading()
        Repository.getAllVehicles().then(
            vehicles => this.props.actions.vehiclesLoaded(vehicles)
        )
    }

    handleVehicleSelect(vehicle: Vehicle) {
        this.props.actions.selectVehicle(vehicle)
        Repository.getTiresById(vehicle.id).then(
            tires => {
                this.props.actions.tiresLoaded(tires, "null")
            }
        )
    }

    handleTiresToBasket(tire: BasketTires) {
        let  index :number =-1
        this.props.basketItems.forEach(x=>{
            console.log(x.id+" =?= "+tire.id)
            if(x.id==tire.id){
                index=this.props.basketItems.indexOf(x)
            }
        })

        const tiresInBasket=this.props.basketItems[index]
        console.log("MMMMMMMM", index+"/"+this.props.basketItems)
        if (tire.stock != 0) {
            
                if (tiresInBasket != undefined && tiresInBasket.amount >= tire.stock) {
                    alert("You reached the limit of our stock")
                } else {
                    this.props.actions.addTireToBasket(tire, "null")
                }
            
        } else {
            alert("Sorry ,this item is unvalable now...")
        }
        // Repository.buy(this.props.tires)
    }


    render() {
        return (
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

            </div>

        )
    }
}

function mapStateToProps(store: StoreType): StoreProps {
    return {
        vehiclesItems: store.vehicles.items,
        selectedVehicle: store.selectedVehicle,
        tires: store.tires.items,
        tiresLoading: store.tires.loading,
        basketItems: store.basket.items
    }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return {
        actions: {
            vehiclesLoading: () => dispatch(Actions.vehiclesLoading()),
            //vehiclesLoaded: (vehicles:Vehicle[]) =>dispatch(Actions.vehiclesLoaded(vehicles))//mai usor de scris  

            vehiclesLoaded: bindActionCreators(Actions.vehiclesLoaded, dispatch),
            selectVehicle: bindActionCreators(Actions.selectVehicle, dispatch),
            tiresLoaded: bindActionCreators(Actions.tiresLoaded, dispatch),
            addTireToBasket: bindActionCreators(Actions.addTireToBasket, dispatch),
            removeTireFromBasket: bindActionCreators(Actions.removeTireFromBasket, dispatch),
            emptyBasket: bindActionCreators(Actions.emptyBasket, dispatch),
            editTyres: bindActionCreators(Actions.editTyres, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)