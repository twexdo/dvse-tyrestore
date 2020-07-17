import * as  React from "react"
import { Sizes, Skins } from "../../../data/models"

type Props = {
    className?:string
    size?:Sizes
    skin?:Skins
    strong?:boolean
}

class Text extends React.Component<Props>{
    render() {
        const { children,size,skin,strong,className} = this.props

        let classList="text"

        if(skin) classList+=" text__skin--"+skin

        if(size) classList+=" text__size--"+size

        if(strong) classList+=" text--"+strong
        
        if(className) classList+=" "+className

        return (
            <div className={classList} >
                {children}
            </div>
        )
    }
}
export default Text