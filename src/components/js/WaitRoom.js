import React, {Component} from 'react'
import "../css/WaitRoom.css"
import logo from '../../img/logo-blackjack.png'
import {Link} from "react-router-dom";
import ClearIcon from '@material-ui/icons/Clear';

class WaitRoom extends Component {
    constructor() {
        super();
        this.state = {
            minutes: 1,
            seconds: 0
        }
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const {seconds, minutes} = this.state
            if (seconds > 0) {
                this.setState(({seconds}) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({minutes}) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }

    render() {
        const {minutes, seconds} = this.state
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
                        <li className="collection-header space-between">
                            <h4>Jugadores</h4>
                            {minutes === 0 && seconds === 0
                                ? <h5>Time out</h5>
                                : <h5>Time: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h5>
                            }
                        </li>
                        <li className="collection-item space-between">
                            <span>Alvin</span>
                            <a className="btn flex-align-center background-btn">
                                <ClearIcon style={{color: "black"}}/>
                            </a>

                        </li>
                        <li className="collection-item space-between">
                            <span>Alvin</span>
                            <a className="btn flex-align-center background-btn">
                                <ClearIcon style={{color: "black"}}/>
                            </a>
                        </li>
                        <li className="collection-item space-between">
                            <span>Alvin</span>
                            <a className="btn flex-align-center background-btn">
                                <ClearIcon style={{color: "black"}}/>
                            </a>
                        </li>
                        <li className="collection-item space-between">
                            <span>Alvin</span>
                            <a className="btn flex-align-center background-btn">
                                <ClearIcon style={{color: "black"}}/>
                            </a>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}

export default WaitRoom