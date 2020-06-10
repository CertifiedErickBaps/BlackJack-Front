import React, {Component} from 'react'
import logo from '../../img/logo-blackjack.png'
import {Link} from "react-router-dom";

class WaitRoom extends Component {

    render() {
        let jugadores = 0

        return (
            <>
                <div className="flex-align-center  hide-on-med-and-down">
                    <img src={logo} className="logo" alt=""/>
                </div>

                <nav>
                    <div className="nav-wrapper nav-color">
                        <ul id="nav-mobile" className="left">
                            <li>
                                <a className="font-text" href="/">Jugadores en sala{' '}
                                    <span className="jugadores-number">{jugadores}</span>{' '}
                                </a>
                            </li>
                        </ul>
                        <ul id="nav-mobile" className="padding-right-1 right">
                            <span
                                className="waves-effect waves-light btn">
                                <Link to="/">
                                    <span className="font-text">
                                        Cancelar partida
                                    </span>
                                </Link>
                            </span>
                        </ul>
                    </div>
                </nav>

                <div className="container has-margin-top">
                    <ul className="collection with-header">
                        <li className="collection-header"><h4>Jugadores</h4> </li>
                        <li className="collection-item">Alvin</li>
                        <li className="collection-item">Alvin</li>
                        <li className="collection-item">Alvin</li>
                        <li className="collection-item">Alvin</li>
                    </ul>
                </div>
            </>
        )
    }
}

export default WaitRoom