import React from "react";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import logo from "./img/logo-blackjack.png";

import Naipes from "./components/Naipes";

function App() {
    return (
        <>
            <div className="flex-align-center">
                <img src={logo} className="logo" alt=""/>
            </div>
            <nav>
                <div className="nav-wrapper nav-color">
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><a href="/">Jugadores en sala: <span className="jugadores-number">2</span> </a></li>
                    </ul>
                </div>
            </nav>
            <Naipes/>
        </>
    );
}

export default App;
