import { Vehicle, Tire } from "../../models";
import axios from "axios"

export function buy(data:Tire[]) {
    return new Promise<Vehicle[]>((resolve, reject) => {
        const host = "https://localhost:44342/api/AddTyreToBasket"

        axios.post(host,data).then(x=>
            console.log("GUT ,axios a pusitemele")
        )
    })
}

function mapResponseToVehicle(data: any): Vehicle[] {
    return data.slice(0, 500).map(x => ({

        id:x.id,
        name:x.name,
        manufacturerName:x.manufacturer.name,
        manufacturerLogo:x.manufacturer.logo

    })
    )
}