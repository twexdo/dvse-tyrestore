import * as React from "react"
import { Text, Loader, Button } from "../index"
import DropDownDots from "../dropDownDots/component"
import SearchBar from "../searchBar/component"

type Props<T> = {
    className?: string
    headers: string[]
    columns: Array<(T) => React.ReactElement>
    items: T[]
    loading?: boolean
    alt?:string
    options?:boolean
    parent?:string
    fun?(key:string):void
}

class Table<T> extends React.Component<Props<T>> {
    useFunction(key:string){
            this.props.fun(key)
           // alert("WE REACHED TABLE :"+key)
    }

    render() {
        const { headers, className, items, columns, loading,alt,children,options,parent } = this.props

        if (loading) {
            return (
                <div className={"table " + className ?? ""}>
                   <Loader/>
                </div>
            )
        }
        if(items.length<=0){
            return(
                <div className={"table " +( className ?? "   " ) +" no_items"}>
                   <Text>{alt}</Text>
                   {children}
                </div>
            )
        }
       
        return (
            <div className={"table " + className ?? ""}>
               {!options && <SearchBar fun={this.useFunction.bind(this)} list={items}/>}
                <div className="table__header">
                    {headers.map((header, idx) => <Text key={idx} size="l" strong skin="primary">{header}</Text>)}
                    
                </div>
                <div className="table__content">
                    {items.map((item, idx) =>
                        <div key={idx} className="table__item">
                            {columns.map((columnCallback, idx) =>
                                <div key={idx} className="table__cell">
                                    {columnCallback(item)}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {options && <DropDownDots parent={parent}  />}
            </div>
        )
    }
}

export default Table