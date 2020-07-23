import { Vehicle, Tire, BasketTires, OrderTypes } from "../data/models";

export type StoreType={
    vehicles:{
        loading?:boolean
        items:Vehicle[]
        originalItems:Vehicle[]
    }
    tires:{
        loading?:boolean
        items:Tire[]
        
    }
    basket:{
        items:BasketTires[]
    }
    

    selectedVehicle?:Vehicle
}

export type ComponentActionType=
    {type:"VEHICLE_LOADING"} |
    {type:"VEHICLE_LOADED",payload:Vehicle[] } |
    {type:"SELECT_VEHICLE",payload:Vehicle} |
    {type:"TIRES_LOADED",payload:[Tire[],OrderTypes ]} |
    {type:"ADD_TIRE_TO_BASKET",payload:[BasketTires,OrderTypes]}|
    {type:"REMOVE_TIRE_FROM_BASKET",payload:BasketTires}|
    {type:"EMPTY_BASKET"} |
    {type:"EDIT_TYRES",payload:Tire[]}|
    {type:"SEARCH",payload:string}
