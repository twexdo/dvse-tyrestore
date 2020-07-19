import * as React from "react"
import { Tire } from "../../../data/models"
import { Table, Text, Button } from "../../shared/index"

type Props = {
    loading?: boolean
    tires: Tire[]
    onAdd(item: Tire): void
    onRemove(item: Tire): void
}

class BasketTable extends React.Component<Props>{

    renderBrand(tire: Tire) {
        return <Text>{tire.brand}</Text>
    }

    renderSize(tire: Tire) {
        return <Text>{tire.size}</Text>
    }
    renderPrice(tire: Tire) {
        return <Text>{tire.price+" RON"}</Text>
    }

    renderAdd(tire: Tire) {
        return <Button icon="add"
            onClick={() => this.props.onAdd(tire)}
        >Add</Button>
    }
    renderRemove(tire: Tire) {
        return <Button icon="remove"
            hoverSkin="danger"
            onClick={() => this.props.onRemove(tire)}
        >Remove</Button>
    }

    render() {

        const { loading, tires } = this.props

        return (
            <Table
                className="basket-table"
                headers={["Basket Items"]}
                loading={loading}
                items={tires}
                alt="Go buy something :)) "
                columns={[this.renderSize, this.renderBrand, this.renderPrice, this.renderAdd.bind(this), this.renderRemove.bind(this)]}
            ></Table>
        )
    }

}
export default BasketTable