import * as React from "react"
import { Text, Button } from "../../shared/index"

type Props = {
    totalPrice: number
    tax:number
}

class Summary extends React.Component<Props>{
    render() {
        const {totalPrice,tax} = this.props
       
        console.log(totalPrice)
        return (
            <div className="summary">
                <Text strong size="l">Order Summary</Text><br></br>
                <div className="total-price-show">
                    <Text size="m">Items cost:</Text>
                    <span><Text size="m">{totalPrice} Lei</Text></span>
                </div>
                <div className="total-price-show">
                    <Text size="m">Delivery cost:</Text>
        <span><Text size="m">{tax} Lei</Text></span>
                </div>
                <hr></hr>
                <Text strong size="l">Total:</Text><br></br>
                <Text strong size="l">{totalPrice+tax}  Lei</Text><br></br>
                <Button longButton skin="success">Proceed</Button>
            </div>

        )
    }
}
export default Summary