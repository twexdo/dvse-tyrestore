import * as React from "react"
import { Tire } from "../../data/models"
import { StoreType } from "../../buisness/model"
import { connect } from "react-redux"
import BasketTable from "./basketTable/component"
import { IActions, Actions } from "../../buisness/actions"
import { Dispatch, bindActionCreators } from "redux"
import Summary from "./basketSummary/component"

type Props = DispatchProps & StoreProps & {

}
type StoreProps = {
    basketItems: Tire[]

}

type DispatchProps = {
    actions: IActions

}
type State = {
    niceBasket: Tire[]
    amount: number[]
}
class Basket extends React.Component<Props,State>{
    constructor(props) {
        super(props)
        this.state = {
            niceBasket: [],
            amount: []
        }
    }


    makeNiceBasket() {
        let bsk: Tire[]=[]
        let amnt: number[]=[]
        let i:number=0
        this.props.basketItems.forEach(t => {
            
            if (!bsk.includes(t)) {
                console.log("adding to  bsk["+i+"]")
                bsk[i] = t
                amnt[i]=1
                i++
            }
            else {
                const ii=bsk.indexOf(t)
                amnt[ii]=amnt[ii]+1
                console.log( ii+" should be x "+amnt[ii])

            }
        })
        this.setState(
            {
                ...this.state,
                niceBasket: [...bsk],
                amount: [...amnt]

            }
        )
    }


    handleOnAdd(tire: Tire) {
        
        this.props.actions.addTireToBasket(tire)
        this.makeNiceBasket()
        
    }
    handleOnRemove(tire: Tire) {
        //nu uita sa editezi si in web-Api
        this.props.actions.removeTireFromBasket(tire)
        this.makeNiceBasket()
    }

    componentWillMount(){
        this.makeNiceBasket()
    }
    

    render() {
        let total: number = 0
        let taxes = 12
        this.props.basketItems.forEach(item => {
            total += item.price
        })
        return (
            <div className="basket-page">
                <BasketTable
                    tires={this.state.niceBasket}
                    amount={this.state.amount}
                    onAdd={this.handleOnAdd.bind(this)}
                    onRemove={this.handleOnRemove.bind(this)}
                > </BasketTable>
                {this.props.basketItems.length>0 &&

                    <Summary totalPrice={total} tax={taxes} onBTNClick={() =>{} } ></Summary>
                }



            </div>
        )
    }
}

function mapStateToProps(store: StoreType): StoreProps {
    return {
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)