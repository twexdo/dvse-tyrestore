import { Vehicle, Tire } from "../../models";
import axios from "axios"

export function createTyre(data: Tire[]) {
    return new Promise<Vehicle[]>((resolve, reject) => {
        //const host = "https://tyrestore-api.dvsero.tk/api/Tyres/AddTyreToBasket"
        const host ="https://localhost:44342/api/Tyres/AddTyreToBasket"
        const options = {
            headers: {

                'Content-Type': 'application/json',
                'rejectUnauthorized': 'false'

            }
        }
        axios.post(host, JSON.stringify(data), options).then(x =>
            console.log("GUT ,axios a pus itemele" + x)
        ).catch(rej => {
            console.log("BAD ,axios nu  a pus itemele" + rej)
        })

    })
}
