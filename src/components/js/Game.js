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
            jugadores: [],
            jugadorActual: ""
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
            // console.log("Peticion reiniciar partida", res.data)
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

    primerTurno = (idJugador) => {
        this.setState({
            jugadorActual: idJugador
        })
    }

    watchTurno = () => {
        return this.state.jugadorActual
    }

    pedirTurno = () => {
        Axios.get(`http://${process.env.REACT_APP_LOCALHOST}/turno`)
            .then((res) => {
                this.setState({
                    jugadorActual: res.data
                })
                console.log("Pedir turno peticion", res.data)
            }).catch((err) => {
            console.log(err)
        })
    }

    componentDidMount() {
        if (!this.props.game.jugador) {
            if (!this.state.jugador && !this.state.croupier) {
                Axios.get(`http://${process.env.REACT_APP_LOCALHOST}/iniciar`).then((res) => {
                    console.log(res.data)
                    this.setState({
                        jugador: res.data.jugador,
                        croupier: res.data.croupier
                    })

                })
            }
        } else {
            //Multijugador
            this.setState({
                jugador: this.props.game.jugador,
                croupier: this.props.game.croupier
            })

        }

        if (this.props.game.jugadores !== undefined) {
            // console.log("Id de jugador en game", this.props.game.jugadores[0].id)
            this.primerTurno(this.props.game.jugadores[0].id)
        } else {
            // console.log(game)
            this.primerTurno(this.props.game.idJugador)
        }
    }

    setHand = (name, hand) => {
        // console.log("La peticion para un set hand lo hace el id: ", id)
        let copy = this.state[name]
        copy.mano = hand
        this.setState({
            [name]: copy
        })
    }

    render() {
        const {game} = this.props
        const {jugador, croupier, multijugador, finalizar, partida_finalizada, jugadorActual} = this.state
        // console.log("Props de game", jugador)

        let exist = (rol) => {
            return rol != null
        }

        let jugador_card = exist(croupier) ? jugador : game.jugador
        let croupier_card = exist(croupier) ? croupier : game.croupier

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
            pedirTurno: this.pedirTurno,
            jugadorActual: jugadorActual,
            watchTurno: this.watchTurno
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
