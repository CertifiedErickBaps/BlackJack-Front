import React, {Component} from 'react'
import '../css/Card.css'
import '../css/Naipes.css'

class Card extends Component {

    constructor(props) {
        super(props)

        this.state = {
            red: true,
        }
    }

    render() {
        const {style, visible, styleCard, value} = this.props
        const {red} = this.state

        const palo = value.charAt(0), valor = value.substring(1, value.length)

        let icon = palo === 'c' ? '♥' : palo === 'd' ? '♦' : palo === 'p' ? '♠' : '♣'

        let icon_color = red ? "icon color-red" : "icon",
            value_up = red ? "size-item-value-up color-red" : "size-item-value-up",
            icon_up = red ? "size-item-icon-up color-red" : "size-item-icon-up",
            value_down = red ? "size-item-value-down color-red" : "size-item-value-down",
            icon_down = red ? "size-item-icon-down color-red" : "size-item-icon-down"

        const items = []

        for (let i = 0; i < valor; i++) items.push(<div key={i} className={icon_color}>{icon}</div>)

        return (
            <div style={style} className={styleCard}>
                {visible && (
                    <>
                        <span className={value_up}>{valor}</span>
                        <span className={icon_up}>{icon}</span>
                        <div className="body-card-item flex-align-center">
                            {items}
                        </div>
                        <span className={icon_down}>{icon}</span>
                        <span className={value_down}>{valor}</span>
                    </>
                )}

            </div>
        )
    }
}

export default Card;