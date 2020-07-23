import { StoreType, ComponentActionType } from "./model";
import { Action } from "redux";
import { Tire, BasketTires } from "../data/models";

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
            const order = action.payload[1]
            console.log(action.payload[0])
            if (order == "cheap") action.payload[0].sort((a, b) => a.price - b.price)
            else if (order == "expensive") action.payload[0].sort((a, b) => b.price - a.price)
            return {
                ...state,
                tires: {
                    ...state.tires,
                    loading: false,
                    items: [...action.payload[0]]
                }
            }
        }
        case "ADD_TIRE_TO_BASKET": {
            let a: number
            let st = []
            if (action.payload[0]) {
                const checker = existInList(state.basket.items, action.payload[0])
                console.log("checker: " + checker)
                if (checker >= 0) {   //tre sa scimbi din basket tire in tire  

                    if (action.payload[0].amount == undefined) action.payload[0].amount = 1
                    a = state.basket.items[checker].amount + 1
                    console.log("Un item se repeta :" + a + " si payload:" + action.payload[0].amount)
                    const index = existInList(state.basket.items, action.payload[0])
                    let aux = state.basket.items
                    aux[index].amount = a
                    st = [...aux]

                }
                else {
                    action.payload[0].amount = 1;
                    st = [...state.basket.items, { ...action.payload[0] }]
                    console.log("LOG DIN ELSE: " + st)
                }
            } else {
                let aux=state.basket.items
                const order = action.payload[1]
                if (order == "cheap") aux.sort((a, b) => a.price - b.price)
                else if (order == "expensive") aux.sort((a, b) => b.price - a.price)
                st=[...aux]
            }
            
            return {
                ...state,
                basket: {
                    items: st
                }
            }


        }
        case "REMOVE_TIRE_FROM_BASKET": {
            return {
                ...state,
                basket: {
                    items: del(action.payload, state.basket.items)
                }
            }
        }
        case "EMPTY_BASKET": {
            let st:BasketTires[]=[]
            return {
                ...state,
                basket: {
                    items: [...st]
                }
            }
        }case "EDIT_TYRES": {
                let st=state.tires.items
                action.payload.forEach(y=>{
                    let index=existInList(st,y)
                    if(index!=-1){
                        st[index]=changeStock(st[index],y)
                    }
                })
            return {
                ...state,
                tires: {
                    ...state.tires,
                    loading: false,
                    items: [...st]
                }
            }
        }


    }
    return state
}

function changeStock(a:Tire,b:Tire){
    a.stock=b.stock
    return a
}
function del(itemX: BasketTires, state: BasketTires[]) {
    const index = state.indexOf(itemX)
    if (state[index].amount == 1)
        state.splice(index, 1)
    else
        state[index].amount -= 1
    return [...state]

}
function existInList(list: BasketTires[]|Tire[], item: BasketTires|Tire): number {
    //compar sa vad daca itemul dat exista in lista data
    let index = -1
    let gasit = false
    const max = list.length ?? 0
    for (let i = 0; i < max; i++) {
        const x = list[i]

        index++
        if (x.id == item.id /*&&
            x.price == item.price &&
            x.season == item.season &&
            x.size == item.size &&
            x.brand == item.brand*/
        ) {
            console.log("Break")
            gasit = true
            break
        }
    }
    if (gasit) { return index }
    return -1
}