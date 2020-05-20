import React, {Component} from 'react';
import "./Card.css";
import "./Naipes.css";

class Card extends Component {
    constructor() {
        super();
        this.state = {
            mazo: "♦",
            valor: 9,
            color: "red"
        }
    }

    render() {
        const cartaIcon = ['♦', '♣', '♥', '♠'];
        const valueCarta = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
        const items = [];
        for (let i = 0; i < this.state.valor; i++) {
            items.push(
                <div className="icon">{this.state.mazo}</div>
            )
        }
        return (
            <div>
                <div className="card">
                    <span className="size-item-value-up">{this.state.valor}</span>
                    <span className="size-item-icon-up">{this.state.mazo}</span>
                    <div className="body-card-item flex-align-center">
                        {items}
                    </div>
                    <span className="size-item-icon-down">{this.state.mazo}</span>
                    <span className="size-item-value-down">{this.state.valor}</span>
                </div>
            </div>
        );
    }
}

export default Card;