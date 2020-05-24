import React, {Component} from 'react';
import "./Card.css";
import "./Naipes.css";

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            palo: "",
            valor: 0,
            red: true,
        };

    }

    componentDidMount() {
        if (this.props.visible != null) {
            let {value, visible} = this.props;
            this.setState({
                palo: value.charAt(0),
                valor: value.charAt(1),
                visible: visible
            });
        }
    }

    render() {
        let icon;
        // eslint-disable-next-line default-case
        switch (this.state.palo) {
            case "c":
                icon = '♥';
                break;
            case "d":
                icon = '♦';
                break;
            case "p":
                icon = '♠';
                break;
            case "t":
                icon = '♣';
                break;
        }

        const items = [];
        for (let i = 0; i < this.state.valor; i++) {
            items.push(
                <div key={i} className={(this.state.red) ? "icon color-red" : "icon"}>{icon}</div>
            )
        }
        // return (<Card key={i} value={carta.carta} visible={carta.visible} style={addRight} styleCard="naipe-selectionR"/>);
        // palos = ['c', 'd', 'p', 't']
        // valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
        // const cartaIcon = ['♦', '♣', '♥', '♠'];
        // const valueCarta = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];


        // console.log(this.props.styleCard);
        return (
            <div style={this.props.style} className={this.props.styleCard}>
                <span
                    className={(this.state.red) ? "size-item-value-up color-red" : "size-item-value-up"}>{this.state.valor}</span>
                <span
                    className={(this.state.red) ? "size-item-icon-up color-red" : "size-item-icon-up"}>{icon}</span>
                <div className="body-card-item flex-align-center">
                    {items}
                </div>
                <span
                    className={(this.state.red) ? "size-item-icon-down color-red" : "size-item-icon-down"}>{icon}</span>
                <span
                    className={(this.state.red) ? "size-item-value-down color-red" : "size-item-value-down"}>{this.state.valor}</span>
            </div>
        );
    }
}

export default Card;