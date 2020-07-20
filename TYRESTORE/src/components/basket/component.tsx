import * as React from "react"
import Text from "../shared/text/component"
import { Tire, Vehicle } from "../../data/models"
import { StoreType } from "../../buisness/model"
import { connect, DispatchProp } from "react-redux"
import BasketTable from "./basketTable/component"
import { IActions, Actions } from "../../buisness/actions"
import { Dispatch, bindActionCreators } from "redux"
import { Button } from "../shared"
import Summary from "./basketSummary/component"

type Props=DispatchProps & StoreProps  & {

}
type StoreProps={
  basketItems: Tire[]        

}

type DispatchProps={
    actions:IActions

}



class Basket  extends React.Component<Props>{
    
    handleOnAdd(tire:Tire){
        console.log("clicked")
        this.props.actions.addTireToBasket(tire)
    }
    handleOnRemove(tire:Tire){
        //nu uita sa editezi si in web-Api
        this.props.actions.removeTireFromBasket(tire)
        
        
    }
    
    render(){
        let total:number=0
        let taxes=12
        this.props.basketItems.forEach(item=>{
            total+=item.price
        })
        return(
            <div className="basket-page">
                 <BasketTable
                        tires={this.props.basketItems}
                        onAdd={this.handleOnAdd.bind(this)} 
                        onRemove={this.handleOnRemove.bind(this)}
                    ></BasketTable>
                    {this.props.basketItems.length>0 && 

                        <Summary totalPrice={total} tax={taxes} onBTNClick={()=>{console.log(this.props.basketItems)}} ></Summary>
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

function  mapDispatchToProps(dispatch:Dispatch):DispatchProps{
    return{
        actions:{
            vehiclesLoading: () =>dispatch(Actions.vehiclesLoading()),
            //vehiclesLoaded: (vehicles:Vehicle[]) =>dispatch(Actions.vehiclesLoaded(vehicles))//mai usor de scris  

            vehiclesLoaded :bindActionCreators(Actions.vehiclesLoaded,dispatch),
            selectVehicle: bindActionCreators(Actions.selectVehicle,dispatch),
            tiresLoaded:bindActionCreators(Actions.tiresLoaded,dispatch),
            addTireToBasket:bindActionCreators(Actions.addTireToBasket,dispatch),
            removeTireFromBasket:bindActionCreators(Actions.removeTireFromBasket,dispatch),
        }
    }   
}

export default connect(mapStateToProps,mapDispatchToProps)(Basket)