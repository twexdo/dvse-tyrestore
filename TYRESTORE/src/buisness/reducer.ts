import { StoreType, ComponentActionType } from "./model";
import { Action } from "redux";

const DEFAULT_STATE: StoreType = {
    basket: {
        items: []
    },
    tires: {
        items: []
    },
    vehicles: {
        items: []
    }

}
var incrementor = 0;
function getID() {
    incrementor += 1;
    return incrementor;
}
export function reducer(state = DEFAULT_STATE, action: ComponentActionType): StoreType {
    switch (action.type) {
        case "VEHICLE_LOADING": {
            return {
                ...state,
                vehicles: {
                    ...state.vehicles,
                    loading: true
                }
            }
        }
        case "VEHICLE_LOADED": {
            return {
                ...state,
                vehicles: {
                    ...state.vehicles,
                    loading: false,
                    items: action.payload
                }
            }
        }
        case "SELECT_VEHICLE": {
            return {
                ...state,
                selectedVehicle: state.selectedVehicle?.id != action.payload.id ? action.payload : undefined,
                tires: {
                    ...state.tires,
                    items: [],
                    loading: true

                }
            }
        }
        case "TIRES_LOADED": {
            return {
                ...state,
                tires: {
                    ...state.tires,
                    loading: false,
                    items: action.payload
                }
            }
        }
        case "ADD_TIRE_TO_BASKET": {
            return {
                ...state,
                basket: {
                    items: [...state.basket.items, action.payload]
                }
            }
        }
        case "REMOVE_TIRE_FROM_BASKET": {
            return {
                ...state,
                basket: {
                    items:del(action.payload,state)
                }
            }
        }


    }
    return state
}
function del(itemX: any, state: any) {
    let itemss = state.basket.items
    const index = itemss.indexOf(itemX)
    itemss.splice(index, 1)
    return itemss

}