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
            let a:number
            let st=[]
            const checker=existInList(state.basket.items,action.payload)
           console.log("checker: "+checker)
            if(checker>=0){   //tre sa scimbi din basket tire in tire  
                
                if(action.payload.amount==undefined)action.payload.amount=1
                a=state.basket.items[checker].amount+1
                console.log("Un item se repeta :"+a+" si payload:"+action.payload.amount)
                const  index=existInList(state.basket.items,action.payload)
                let aux=state.basket.items
                aux[index].amount=a
                st=[...aux]
              
            }
            else {
                action.payload.amount=1;
                st=[...state.basket.items, {...action.payload}] 
               console.log("LOG DIN ELSE: "+st)
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
                    items:del(action.payload,state.basket.items)
                }
            }
        }


    }
    return state
}
function del(itemX: BasketTires, state:BasketTires[]) {
    const index = state.indexOf(itemX)
    if(state[index].amount==1)
    state.splice(index, 1)
    else
    state[index].amount-=1
    return [...state]

}
function existInList(list:BasketTires[],item:BasketTires):number{
    //compar sa vad daca itemul dat exista in lista data
    let index=-1
    let gasit=false
    const max=list.length ?? 0
    for(let i=0;i<max;i++){
        const x=list[i]
      
        index++
        if(x.id==item.id && 
            x.price==item.price && 
            x.season==item.season && 
            x.size==item.size && 
            x.brand==item.brand
            ){ console.log("Break")
                gasit=true
                break }
    }
    if(gasit){ return index}
    return -1
}