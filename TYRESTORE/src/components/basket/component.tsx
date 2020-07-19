import * as React from "react"
import Text from "../shared/text/component"
import { Tire, Vehicle } from "../../data/models"
import { StoreType } from "../../buisness/model"
import { connect } from "react-redux"
import BasketTable from "./basketTable/component"
import { IActions, Actions } from "../../buisness/actions"
import { Dispatch, bindActionCreators } from "redux"
import { Button } from "../shared"
import Summary from "./basketSummary/component"

type Props=StoreProps  & {

}
type StoreProps={
  basketItems: Tire[]        

}

class Basket  extends React.Component<Props>{
 
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
                        onAdd={()=>{}} 
                        onRemove={()=>{}}
                    ></BasketTable>
                    {this.props.basketItems.length>0 && 

                        <Summary totalPrice={total} tax={taxes} ></Summary>
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


export default connect(mapStateToProps)(Basket)