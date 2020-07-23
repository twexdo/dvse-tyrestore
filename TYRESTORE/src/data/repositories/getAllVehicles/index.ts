import { Vehicle } from "../../models";
import axios from "axios"

export function getAllVehicles() {
    return new Promise<Vehicle[]>((resolve, reject) => {
        //const host = "https://localhost:44342/"
        //const method = "api/VehicleAndTyreMain/GetVehicleModelsWithManufacturers"

        const host="https://tyrestore-api.dvsero.tk/"
        const method = "api/VehiclesAndTyresMain/GetVehicleModelsWithManufacturers"
        const options ={
            headers: {
            'Access-Control-Allow-Origin': '*'
            }
        }
        axios.get(host + method,options).then(
            response => {
                if (response.data) {
                    resolve(mapResponseToVehicle(response.data))
                } else {
                    reject()
                }
            }
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