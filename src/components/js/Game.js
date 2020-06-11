import React, {Component} from 'react'
import {Link} from "react-router-dom";
import Axios from 'axios'
import logo from '../../img/logo-blackjack.png'
import Naipes from './Naipes'
import repartir from '../../models/repartir.json'

class Game extends Component {

    constructor(props) {
        super(props)

        this.state = {
            finalizar: 'deshabilitado',
            jugador: undefined,
            croupier: undefined,
            multijugador: false,
            partida_finalizada: false,
            jugadores: []
        }

    }

    reiniciarPartida = () => {
        this.setState({
            finalizar: 'habilitado',
            partida_finalizada: true
        })
    }

    handleReiniciarPartida = () => {
        this.setState({partida_finalizada: false})

        Axios.get(`http://${process.env.REACT_APP_LOCALHOST}/reiniciar`).then((res) => {
            this.setState({
                jugador: res.data.jugador,
                croupier: res.data.croupier,
                finalizar: 'habilitada'
            })
        }).catch(() => {
            this.setState({
                jugador: repartir.jugador,
                croupier: repartir.croupier
            })
        })
    }

    componentDidMount() {
        if (!this.props.game.jugador) {
            if (!this.state.jugador && !this.state.croupier) {
                Axios.get(`http://${process.env.REACT_APP_LOCALHOST}/iniciar`).then((res) => {
                    this.setState({
                        jugador: res.data.jugador,
                        croupier: res.data.croupier
                    })
                })
            }
        } else {
            console.log(this.props.jugador, this.props.croupier)
            this.setState({
                jugador: this.props.jugador,
                croupier: this.props.croupier
            })
        }
    }

    setHand = (name, hand) => {
        let copy = this.state[name]
        copy.mano = hand
        this.setState({
            [name]: copy
        })
    }

    render() {
        const {game} = this.props
        const {jugador, croupier, multijugador, finalizar, partida_finalizada} = this.state


        let exist = (rol) => {
            return rol != null
        }

        let jugador_card = exist(croupier) ? jugador : null
        let croupier_card = exist(croupier) ? croupier : null

        let numJugadores = multijugador
            ? (<span className="jugadores-number">{jugador.length}</span>)
            : (<span className="jugadores-number">1</span>)

        const naipesProps = {
            nombre: game.nombre,
            idJugador: game.idJugador,
            jugador: jugador_card,
            croupier: croupier_card,
            setHand: this.setHand,
            reiniciarPartida: this.reiniciarPartida,
            partida_finalizada: partida_finalizada,
        }

        return (
            <>
                <div className="flex-align-center  hide-on-med-and-down">
                    <img src={logo} className="logo" alt=""/>
                </div>

                <nav>
                    <div className="nav-wrapper nav-color">
                        <ul id="nav-mobile" className="left">
                            <li>
                                <a className="font-text" href="/">Jugadores en sala{' '}{numJugadores}{' '}</a>
                            </li>
                            <li>
                                <span className="font-text">Pin: {game.idPartida}</span>
                            </li>
                        </ul>
                        <ul id="nav-mobile" className="padding-right-1 right">
                            <button
                                onClick={() => this.handleReiniciarPartida()}
                                className="waves-effect waves-light btn"
                                disabled={finalizar === 'deshabilitado' || !partida_finalizada}>
                                <span className="font-text">
                                    Seguir jugando
                                </span>
                            </button>
                        </ul>
                        <ul id="nav-mobile" className="padding-right-1 right">
                            <span
                                className="waves-effect waves-light btn">
                                <Link to="/">
                                    <span className="font-text">
                                        Terminar juego
                                    </span>
                                </Link>
                            </span>
                        </ul>
                    </div>
                </nav>
                <Naipes {...naipesProps}/>
            </>
        )
    }
}

export default Game;
