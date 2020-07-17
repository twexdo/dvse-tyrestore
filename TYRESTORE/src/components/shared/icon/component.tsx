import * as  React from "react"
import { Sizes } from "../../../data/models"
import {Text} from "../index"
type Props = {
  className?:string
  name?:string
  size?:Sizes
  badge?:number
  onClick?():void
}

class Icon extends React.Component<Props>{
    render() {
        const { children ,className,name,size,onClick,badge} = this.props

        let classList="icon"
        if(size) classList+=" icon__size--"+size
        if(className) classList+=" "+className;
        
        return (
            <span className={classList} onClick={onClick}>
                <img src={"/images/icons/"+name+".svg"}></img>
                {badge != undefined && 
                    <div className="badge">
                        <Text size="s">{badge}</Text>
                    </div>
                    }

            </span>
            
        )
    }
}
export default Icon