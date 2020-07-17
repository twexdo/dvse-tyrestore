import { Tyre } from "../../models";
import axios from "axios"

export function getTyresById(id:number) {
    return new Promise<Tyre[]>((resolve, reject) => {
        const host = "https://tyrestore-api.dvsero.tk/"
        const method = "api/VehiclesAndTyresMain/GetTyreByVehicleModelId/"+id

        axios.get(host + method).then(
            response => {
                if (response.data) {
                    resolve(mapResponseToTyres(response.data ))
                } else {
                    reject()
                }
            }
        )

    })
}

function mapResponseToTyres(data: any): Tyre[] {
    return data.map(x => ({
        brand: x.brand,
        season:x.season,
        id:x.id,
        size:x.tyre.name,

        price:x.price,
        //stock:x.stok
    })
    )
}