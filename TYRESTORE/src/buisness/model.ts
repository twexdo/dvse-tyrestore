import { Vehicle, Tire } from "../data/models";

export type StoreType={
    vehicles:{
        loading?:boolean
        items:Vehicle[]
    }
    tires:{
        loading?:boolean
        items:Tire[]
    }
    basket:{
        items:Tire[]
    }
    selectedVehicle?:Vehicle
}

export type ComponentActionType=
    {type:"VEHICLE_LOADING"} |
    {type:"VEHICLE_LOADED",payload:Vehicle[] } |
    {type:"SELECT_VEHICLE",payload:Vehicle} |
    {type:"TIRES_LOADED",payload:Tire[]} |
    {type:"ADD_TIRE_TO_BASKET",payload:Tire}|
    {type:"REMOVE_TIRE_FROM_BASKET",payload:Tire}
