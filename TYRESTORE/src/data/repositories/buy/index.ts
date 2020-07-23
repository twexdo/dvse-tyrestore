import { Vehicle, Tire, BasketTires } from "../../models";
import axios from "axios"

export function buy(data: BasketTires[]) {
    return new Promise<Tire[]>((resolve, reject) => {
        //const host = "https://tyrestore-api.dvsero.tk/api/Tyres/AddTyreToBasket"
        const host ="https://localhost:44342/api/Tyres/AddTyreToBasket"
        const options = {
            headers: {

                'Content-Type': 'application/json',
                'rejectUnauthorized': 'false'

            }
        }
        
        axios.post(host, JSON.stringify(data), options).then( (response)=>{
            resolve(mapResponseToTires(response.data))
            console.log(response.data)
            let tyres="";
            response.data.forEach((item:BasketTires) =>{
                tyres+= item.stock+" "+ item.brand+ "  tyres remained in stock"+"\n"
            } )
            alert(tyres)
            
        }
        ).catch(rej => {
            reject()
            console.log("BAD ,axios nu  a pus itemele" + rej)
        })
    })
}

function mapResponseToTires(data: any): Tire[] {
    return data.map(x => ({
        brand: x.brand,
        season:x.season,
        id:x.id,
        stock:x.stock,
        part:x.part,
        price:x.price,




    })
    )
}