import * as React from "react"
import { Vehicle } from "../../../data/models"
import { Table,Text } from "../../shared/index"

type Props = {
    loading?: boolean
    vehicles: Vehicle[]
    selectedVehicle?: Vehicle
    onSelectVehicle: (vehicle: Vehicle) => void
}

class VehicleTable extends React.Component<Props>{

    renderLogo(vehicle:Vehicle){
        return <img src={vehicle.manufactrerLogo} style={{width:'3em' ,height:'2em'}}></img>
    }

    renderManufacturer(vehicle:Vehicle){
    return <Text>{vehicle.manufacturerName} </Text>
    }


    render() {
        
    const {loading,vehicles,selectedVehicle,onSelectVehicle}=this.props

        return (
            <Table 
            className="vehicle-table"
            headers={["Logo","Manufacturer","Model","Actions"]}
            loading={loading}
            items={vehicles}
            columns={[this.renderLogo]}
             ></Table>
        )
    }

}
export default VehicleTable