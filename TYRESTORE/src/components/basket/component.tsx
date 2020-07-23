import * as React from "react"
import { Tire, BasketTires } from "../../data/models"
import { StoreType } from "../../buisness/model"
import { connect } from "react-redux"
import BasketTable from "./basketTable/component"
import { IActions, Actions } from "../../buisness/actions"
import { Dispatch, bindActionCreators } from "redux"
import Summary from "./basketSummary/component"
import { Repository } from "../../data/repositories"

type Props = DispatchProps & StoreProps & {

}
type StoreProps = {
    basketItems: BasketTires[]

}

type DispatchProps = {
    actions: IActions

}
class Basket extends React.Component<Props>{
    handleOnAdd(tire: BasketTires) {

        let index: number = -1
        this.props.basketItems.forEach(x => {
            console.log(x.id + " =?= " + tire.id)
            if (x.id == tire.id) {
                index = this.props.basketItems.indexOf(x)
            }
        })

        const tiresInBasket = this.props.basketItems[index]
        console.log("MMMMMMMM", index + "/" + this.props.basketItems)
        if (tire.stock != 0) {

            if (tiresInBasket != undefined && tiresInBasket.amount >= tire.stock) {
                alert("You reached the limit of our stock")
            } else {
                this.props.actions.addTireToBasket(tire, "null")
            }

        } else {
            alert("Sorry ,this item is unvalable now...")
        }

    }
    handleOnRemove(tire: BasketTires) {
        //nu uita sa editezi si in web-Api
        this.props.actions.removeTireFromBasket(tire)
    }
    buy(basket: BasketTires[]) {

        basket.forEach(x => {
            x.stock = x.amount
        })
        Repository.buy(basket).then(x => {

            this.props.actions.emptyBasket()
            this.props.actions.editTyres(x)
        }
        )
    }


    render() {
        let total: number = 0
        let taxes = 12
        this.props.basketItems.forEach(item => {
            total += item.price * item.amount
        })
        return (
            <div className="basket-page">
                <BasketTable
                    tires={this.props.basketItems}
                    onAdd={this.handleOnAdd.bind(this)}
                    onRemove={this.handleOnRemove.bind(this)}
                > </BasketTable>
                {this.props.basketItems.length > 0 &&

                    <Summary totalPrice={total} tax={taxes} onBTNClick={() => { this.buy(this.props.basketItems) }} ></Summary>
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
            emptyBasket: bindActionCreators(Actions.emptyBasket, dispatch),
            editTyres: bindActionCreators(Actions.editTyres, dispatch),
            search: bindActionCreators(Actions.search, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)