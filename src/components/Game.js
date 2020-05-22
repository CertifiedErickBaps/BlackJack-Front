import React, { Component } from "react";
import logo from "../img/logo-blackjack.png";
import Naipes from "./Naipes";

class Game extends Component {
    render() {
        return (
            <>
                <div className="flex-align-center">
                    <img src={logo} className="logo" alt="" />
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
                                    <span className="jugadores-number">2</span>{" "}
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Naipes />
            </>
        );
    }
}

export default Game;
