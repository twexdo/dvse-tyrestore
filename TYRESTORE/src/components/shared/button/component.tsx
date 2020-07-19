import * as  React from "react"
import { Sizes, Skins } from "../../../data/models"
import { Icon } from ".."

type Props = {
    className?: string
    disabled?: boolean
    isActive?: boolean
    icon?: string
    size?: Sizes
    skin?: Skins
    hoverSkin?: Skins
    longButton?:boolean
    onClick?(): void
}

class Button extends React.Component<Props>{
    render() {
        const { children, className, disabled, isActive, icon, size, skin, onClick,hoverSkin,longButton } = this.props

        let customClassName = "button"
        if (skin)
            customClassName += " button__skin--" + skin

        if (hoverSkin)
            customClassName += " button__hover_skin--" + hoverSkin

        if (size)
            customClassName += " button__size--" + size

        if (disabled)
            customClassName += " button--disabled"

        if (isActive)
            customClassName += " button--isActive"

        if (className)
            customClassName += " " + className;
        if(longButton)
            customClassName += " longButton";

        return (
            <div className={customClassName} onClick={onClick}>
                <span>{children}</span>
                {icon && <span><Icon size="m" name={icon}> </Icon></span>}
            </div>
        )
    }
}
export default Button