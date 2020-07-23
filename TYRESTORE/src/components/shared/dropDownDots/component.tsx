import * as React from "react"
import { Text } from "../index"
import { Repository } from "../../../data/repositories"
import { OrderTypes, Vehicle, Tire } from "../../../data/models"
import { Dispatch } from "redux"
import { Actions, IActions } from "../../../buisness/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { StoreType } from "../../../buisness/model"

type Props = DispatchProps & StoreProps & {
    parent: string
}
type State = {
    selected: boolean
}
type DispatchProps = {
    actions: IActions

}
type StoreProps = {
    vehiclesItems?: Vehicle[]
    selectedVehicle?: Vehicle
    tires?: Tire[],
    tiresLoading?: boolean

}
class DropDownDots extends React.Component<Props, State>{
    constructor(props) {
        super(props)
        this.state = {
            selected: false
        }
        this.handleOnClick = this.handleOnClick.bind(this)
        this.handlerCheap = this.handlerCheap.bind(this)
        this.handlerExpensive = this.handlerExpensive.bind(this)
    }
    handleOnClick() {
        this.setState({
            selected: !this.state.selected
        })


    }
    handlerCheap() {
        this.setState({
            selected: !this.state.selected
        })
        if (this.props.parent == "tires") this.props.actions.tiresLoaded(this.props.tires, "cheap")
        else if (this.props.parent == "basket") this.props.actions.addTireToBasket(null, "cheap")
    }
    handlerExpensive() {
        this.setState({
            selected: !this.state.selected
        })

        if (this.props.parent == "tires") this.props.actions.tiresLoaded(this.props.tires, "expensive")
        else if (this.props.parent == "basket") this.props.actions.addTireToBasket(null, "expensive")
    }
    render() {
        return (
            <div className="container">
                <div onClick={this.handleOnClick} className="dropdown-button">
                    <div />
                </div>
                {this.state.selected &&
                    <div className="menu">
                        <div onClick={this.handlerCheap}><Text>Cheap</Text></div>
                        <div onClick={this.handlerExpensive}><Text>Expensive</Text></div>
                    </div>
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
        tiresLoading: store.tires.loading
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
            editTyres:bindActionCreators(Actions.editTyres, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DropDownDots)