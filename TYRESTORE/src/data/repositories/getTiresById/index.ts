import { Tire } from "../../models";
import axios from "axios"

export function getTiresById(id:number) {
    return new Promise<Tire[]>((resolve, reject) => {
        const host = "https://localhost:44342/"
        const method = "api/VehicleAndTyreMain/GetTyreByVehicleModelId/"+id

        //const host="https://tyrestore-api.dvsero.tk/"
        //const method="api/VehiclesAndTyresMain/GetTyreByVehicleModelId/"+id


        axios.get(host + method).then(
            response => {
                if (response.data) {
                    resolve(mapResponseToTires(response.data))
                    console.log(response.data)
                } else {
                    reject()
                }
            }
        )

    })
}

function mapResponseToTires(data: any): Tire[] {
    return data.map(x => ({
        brand: x.brand,
        season:x.season,
        id:x.id,
        size:x.tyre.name,
        stock:x.stock,
        part:x.part,
        price:x.price,
        
        //stock:x.stok
    })
    )
}