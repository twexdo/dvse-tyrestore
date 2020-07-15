export type StoreType  ={
    counter: number
}

const DEFAULT_STATE:StoreType={
    counter: 0
}

export type StoreActions={
    type:"Increment"

}

export  function reducer(state=DEFAULT_STATE,action: StoreActions):StoreType{
    switch(action.type as String){
        case "Increment":{
            return{
                ...state,
                counter:state.counter+1
            }
        }
        case "Decrement":{
             if(state.counter!=0)   
             return{
                ...state,
                counter:state.counter-1
            }
            else {
                alert("Valoarea nu poate fi negativa!")
                return state
            }
        }
        default:{
            return state
        }
    }

}