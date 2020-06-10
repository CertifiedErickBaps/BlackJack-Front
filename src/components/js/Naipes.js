import React, {Component} from 'react'
import '../css/Naipes.css'
import Card from './Card'
import {apostar, evaluarMano, finalizarPartida, peticionPedir} from './Peticiones'
import swal from 'sweetalert'
import {Redirect} from 'react-router-dom'

class Naipes extends Component {
    constructor(props) {

        super(props)

        this.state = {
            left_card: 3,
            right_card: 3,
            bet: "",
            credit: 100,
            score_jugador: 0,
            score_croupier: 0,
            inGame: false,
            ganador: "",
            irMenu: false
        }

    }

    /** <---- Manejadores ----> */

    /** Evento para obtener el input del usuario */
    handleInputBet = (evt) => {
        evt.preventDefault()
        this.setState({
            bet: parseInt(evt.target.value),
        })
    }

    /** Evento para restar al wallet */
    handleWallet = () => {
        const {credit, bet} = this.state
        const {jugador} = this.props

        if (bet > credit) swal('¡Ops!', 'No puedes apostar un monto mayor al crédito', 'error')
        else if (bet < 0) swal('¡Ops!', 'No puedes ingresar número negativo', 'error')
        else {
            apostar(jugador, bet).then(res => {
                this.setState({
                        credit: res,
                        bet: "",
                        inGame: true
                    }
                )
            })
        }
    }

    /** <---- Funciones ----> */

    pedirCarta = (rol, rolID) => {
        if (rolID !== null) {
            peticionPedir(rol, rolID).then(mano => {
                if (rol === 'jugador') this.evaluarManoJugador(rol, rolID, mano)
                else this.evaluarManoCroupier(rol, rolID, mano)
            })
        }
    }

    evaluarManoJugador = (rol, rolID, mano) => {
        const {setHand} = this.props

        evaluarMano(rolID).then((valor) => {
            this.setState({score_jugador: valor})

            if (this.state.score_jugador > 21) {
                swal("Oops perdiste!", 'Rebasaste la casa o tienes mas de 21 en tu mano', 'error')
                this.reiniciarEstados()
            }
        })

        setHand(rol, mano)
    }

    evaluarManoCroupier = (rol, rolID) => {
        const {setHand} = this.props

        evaluarMano(rolID).then((valor) => {
            this.setState({score_croupier: valor})

            if (this.state.score_croupier < 17)
                peticionPedir(rol, rolID).then(mano => setHand(rol, mano))

            this.reiniciarEstados()
        })
    }

    reiniciarEstados = () => {
        const {setHand, reiniciarPartida} = this.props

        finalizarPartida().then(res => {
            this.setState({
                score_jugador: res.data.score_jugador,
                score_croupier: res.data.score_croupier,
                inGame: false,
                ganador: res.data.ganador,
                credit: res.data.credito
            })

            if (res.data.credito === 0 && res.data.ganador === 'croupier')
                swal('Oops!', 'Perdiste todo tu crédito', 'error').then(() => this.setState({irMenu: true}))

            reiniciarPartida()
            setHand("croupier", res.data.croupier)
        })
    }

    /** <---- Componentes ----> */

    crearCartas = (rol, side) => {
        let cartas

        if (rol != null) {
            let space = -3

            cartas = rol.mano.map((carta, i) => {
                space += 3
                return side ?
                    (<Card key={i} value={carta.carta} visible={carta.visible} style={{left: `${space}rem`}}
                           styleCard={carta.visible ? "naipe-selectionL" : "naipe-selectionL-hidden"}/>) :
                    (<Card key={i} value={carta.carta} visible={carta.visible} style={{right: `${space}rem`}}
                           styleCard="naipe-selectionR"/>)
            })
        }

        return cartas
    }

    render() {
        const {jugador, croupier, partida_finalizada, nombre, idJugador} = this.props
        const {credit, bet, score_croupier, score_jugador, inGame, ganador, irMenu} = this.state

        let cartasJugador, cartasCroupier

        if (Array.isArray(jugador)) {
            jugador.forEach((contendiente) => {
                if (idJugador === contendiente.id)
                    cartasJugador = this.crearCartas(contendiente, true)
            })
            cartasCroupier = this.crearCartas(croupier, true)
        } else {
            cartasJugador = this.crearCartas(jugador, false)
            cartasCroupier = this.crearCartas(croupier, true)
        }

        let winner = (ganador === "croupier") ? <span>Perdiste</span> : <span>Ganaste</span>

        return (
            <>
                <div className="wrapper">

                    <div className="naipesL">
                        <h5 className="title-dealer white-text">Dealer</h5>
                        {cartasCroupier}
                    </div>
                    <div className="naipesR">
                        <h5 className="title-jugador white-text">{nombre ? `${nombre}(${idJugador})` : 'Jugador'}</h5>
                        {cartasJugador}
                    </div>
                </div>
                <div className="container row">
                    <div className="col l4 m12 s12 center-align">
                        <h5 className="white-text">Creditos: {credit}$</h5>
                    </div>
                    <div className="col l4 m12 s12 center-align">
                        {partida_finalizada && (
                            <>
                                <h5 className="white-text">Score final</h5>
                                <br/>
                                <h6 className="white-text">{score_croupier}{" "} - {" "}{score_jugador}</h6>
                            </>
                        )}
                    </div>
                    <h5 className={partida_finalizada ? "col l4 m12 s12 center-align white-text" : "hide col m4 s12 center-align"}>
                        {winner}
                    </h5>
                </div>
                <div className="container row flex-align-center-buttons">
                    <div className="col l4 m12 s12 flex-align-center padding-button">
                        <div className="input-field">
                            <input value={bet} type="number" onChange={this.handleInputBet}/>
                        </div>
                        <button onClick={this.handleWallet} className="waves-effect waves-light btn"
                                disabled={partida_finalizada}>
                            Apostar
                        </button>
                    </div>
                    <div className="col l4 m12 s12 center-align padding-button">
                        <button onClick={() => this.pedirCarta("jugador", jugador.id)}
                                className="waves-effect waves-light btn"
                                disabled={!inGame}>
                            Pedir
                        </button>
                    </div>
                    <div className="col l4 m12 s12 center-align padding">
                        <button onClick={() => this.pedirCarta("croupier", croupier.id)}
                                className="waves-effect waves-light btn"
                                disabled={!inGame}>
                            Plantarse
                        </button>
                    </div>

                </div>
                {irMenu && (<Redirect to="/"/>)}
            </>

        )
    }
}

export default Naipes
