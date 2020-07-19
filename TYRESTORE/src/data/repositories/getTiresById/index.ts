import { Tire } from "../../models";
import axios from "axios"

export function getTiresById(id:number) {
    return new Promise<Tire[]>((resolve, reject) => {
        const host = "https://tyrestore-api.dvsero.tk/"//pentru a nu trebui sa imi tin eu server deschis :)) //de schimbat cu localhost cand vreau sa imi folosesc eu serverul
        const method = "api/VehiclesAndTyresMain/GetTyreByVehicleModelId/"+id

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
        price:x.price,
        
        //stock:x.stok
    })
    )
}