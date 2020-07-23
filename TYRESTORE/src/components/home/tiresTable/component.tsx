import * as React from "react"
import { Tire, BasketTires } from "../../../data/models"
import { Table, Text, Button } from "../../shared/index"

type Props = {
    loading?: boolean
    tires: Tire[]
    onAddToBasket(item:BasketTires):void
}

class TiresTable extends React.Component<Props>{

    renderBrand(tire: BasketTires) {
        return <Text>{tire.brand}</Text>
    }
    renderPrice(tire: BasketTires) {
        return <Text strong skin={"primary"}>{tire.price+" RON"}</Text>
    }
    renderSize(tire: BasketTires) {
        return <Text>{tire.size}</Text>
    }
    renderSeason(tire: BasketTires) {
        return <Text>{tire.season}</Text>
    }
    renderActions(tire: BasketTires) {
        return <Button icon="add"
                        onClick={()=>this.props.onAddToBasket(tire)}
                       >Add</Button>
                    }


    render() {

        const { loading, tires } = this.props

        return (
            <Table
            parent="tires"
                className="tires-table"
                headers={["Size", "Brand", "Season", "Price  ", "Actions"]}
                loading={loading}
                items={tires}
                options
                alt="Sorry, we have no tires for this type of car..."
                columns={[this.renderSize, this.renderBrand, this.renderSeason, this.renderPrice, this.renderActions.bind(this)]}
            ></Table>
            
        )
    }

}
export default TiresTable