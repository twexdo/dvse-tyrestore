import * as React from "react"
import { Tire } from "../../../data/models"
import { Table, Text, Button } from "../../shared/index"
import { Router, Route, RouteComponentProps, withRouter } from 'react-router';
type Props = RouteComponentProps & {
    loading?: boolean
    tires: Tire[]
    amount: number[]
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
        return <Text>{tire.price + " RON"}</Text>
    }


    renderSeason(tire: Tire) {
        return <Text>{tire.season}</Text>
    }

    renderAmount(tire: Tire) {
        const index = this.props.tires.indexOf(tire)
        const amount = this.props.amount[index]
        console.log(index + " => " + amount)
        return <Text>{amount}</Text>//change to amount
    }

    renderAdd(tire: Tire) {
        return <Button icon="add"
            onClick={() => { this.props.onAdd(tire) }}
        >Add</Button>
    }
    renderRemove(tire: Tire) {
        return <Button icon="remove"
            hoverSkin="danger"
            onClick={() => this.props.onRemove(tire)}
        >Remove</Button>
    }


    render() {

        const { loading, history } = this.props
        return (
            <Table
                className="basket-table"
                headers={["Size", "Brand", "Season", "Price  ", "Amount", "Action+", "Action-"]}
                loading={loading}
                items={this.props.tires}
                alt="Go buy something :)) "
                columns={[this.renderSize,
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