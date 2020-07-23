import { ComponentActionType } from "./model";
import { Vehicle, Tire,BasketTires, OrderTypes } from "../data/models";

function vehiclesLoading():ComponentActionType{
    return{type:"VEHICLE_LOADING"}
}
function vehiclesLoaded(items:Vehicle[]):ComponentActionType{
    return{type:"VEHICLE_LOADED",payload:items}
}

function selectVehicle(vehicle:Vehicle):ComponentActionType{
     return{
         type:"SELECT_VEHICLE",payload:vehicle
     }
}
function tiresLoaded(tires:Tire[],order:OrderTypes):ComponentActionType{
    return{
        type:"TIRES_LOADED",payload:[tires,order]
    }
     
}

function addTireToBasket(tire:BasketTires,order:OrderTypes):ComponentActionType{
    return {type:"ADD_TIRE_TO_BASKET",payload:[tire,order]}

}
function removeTireFromBasket(tire:BasketTires):ComponentActionType{
    return {type:"REMOVE_TIRE_FROM_BASKET",payload:tire}

}


export const Actions={
    vehiclesLoading,
    vehiclesLoaded,
    selectVehicle,
    tiresLoaded,
    addTireToBasket,
    removeTireFromBasket
}
export type IActions=typeof Actions