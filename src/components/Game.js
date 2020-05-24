import React, {Component} from "react";

import Axios from 'axios';
import logo from "../img/logo-blackjack.png";

import Naipes from "./Naipes";

class Game extends Component {
    constructor() {
        super();
        this.state = ({});
    }

    componentDidMount() {
        Axios.get(`http://${process.env.REACT_APP_LOCALHOST}/iniciar`)
            .then(res => {
                // console.log(res.data);
                this.setState(res.data);
            })
            .then(() => {
                // console.log(this.props.location.state.multijugador);
                this.setState({
                    multijugador: this.props.location.state.multijugador
                })
            });
    }

    render() {
        const {jugador, croupier} = this.state;
        var jugador_card;
        var croupier_card;
        if (jugador != null || croupier != null) {
            jugador_card = jugador;
            croupier_card = croupier;
        }

        let jugadores;
        if (this.state.multijugador === "true") {
            jugadores = (<span className="jugadores-number">2</span>);
        } else {
            jugadores = (<span className="jugadores-number">1</span>);
        }


        return (
            <>
                <div className="flex-align-center">
                    <img src={logo} className="logo" alt=""/>
                </div>
                <nav>
                    <div className="nav-wrapper nav-color">
                        <ul
                            id="nav-mobile"
                            className="left hide-on-med-and-down"
                        >
                            <li>
                                <a href="/">
                                    Jugadores en sala:{" "}
                                    {jugadores}
                                    {" "}
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Naipes jugador={jugador_card} croupier={croupier_card}/>
            </>
        );
    }
}

export default Game;
