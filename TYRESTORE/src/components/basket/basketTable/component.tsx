import * as React from "react"
import { BasketTires } from "../../../data/models"
import { Table, Text, Button } from "../../shared/index"
import { Router, Route, RouteComponentProps, withRouter } from 'react-router';
type Props = RouteComponentProps & {
    loading?: boolean
    tires: BasketTires[]
    onAdd(item: BasketTires): void
    onRemove(item: BasketTires): void
}

class BasketTable extends React.Component<Props>{

    renderBrand(tire: BasketTires) {
        return <Text>{tire.brand}</Text>
    }

    renderSize(tire: BasketTires) {
        return <Text>{tire.size}</Text>
    }

    renderPrice(tire: BasketTires) {
        return <Text>{tire.price + " RON"}</Text>
    }
    renderID(tire: BasketTires) {
        return <Text>{tire.id}</Text>
    }

    renderSeason(tire: BasketTires) {
        return <Text>{tire.season}</Text>
    }

    renderAmount(tire: BasketTires) {
        return <Text>{tire.amount}</Text>
    }

    renderAdd(tire: BasketTires) {
        return <Button icon="add"
            onClick={() => { this.props.onAdd(tire) }}
        >Add</Button>
    }
    renderRemove(tire: BasketTires) {
        return <Button icon="remove"
            hoverSkin="danger"
            onClick={() => this.props.onRemove(tire)}
        >Remove</Button>
    }
    renderButton() {
        return <Button></Button>
    }

    render() {

        const { loading, history } = this.props
        return (
            <Table
                parent="basket"
                options
                className="basket-table"
                headers={["Size", "Brand", "Season", "Price  ", "Amount", "Action+", "Action-"]}
                loading={loading}
                items={this.props.tires}
                alt="Go buy something :)) "
                columns={[
                    //this.renderID,
                    this.renderSize,
                    this.renderBrand,
                    this.renderSeason,
                    this.renderPrice,
                    this.renderAmount.bind(this),
                    this.renderAdd.bind(this),
                    this.renderRemove.bind(this)]}
            >
                {<Button hoverSkin="highlight" size="m" longButton onClick={() => { history.push('/') /* de ce are delay?*/ }}> Back to shop </Button>}
            </Table>
        )
    }

}
export default withRouter(BasketTable)