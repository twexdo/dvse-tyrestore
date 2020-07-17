import * as  React from "react"
import { Sizes, Skins } from "../../../data/models"

type Props = {
    className?: string
    disabled?: boolean
    isActive?: boolean
    icon?: string
    size?: Sizes
    skin?: Skins
    onClick?(): void
}

class Button extends React.Component<Props>{
    render() {
        const { children, className, disabled, isActive, icon, size, skin, onClick } = this.props

        let customClassName = "button"
        if (skin)
            customClassName += " button__skin--" + skin

        if (size)
            customClassName += " button__size--" + size

        if (disabled)
            customClassName += " button--disabled"

        if (isActive)
            customClassName += " button--isActive"

        if (className)
            customClassName += " " + className;


        return (
            <button className={customClassName} onClick={onClick}>
                {children}
            </button>
        )
    }
}
export default Button