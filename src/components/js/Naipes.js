import React, {Component} from 'react'
import '../css/Naipes.css'
import Card from './Card'
import {apostar, evaluarMano, finalizarPartida, peticionPedir} from './Peticiones'
import swal from 'sweetalert'

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
            partida_finalizada: false
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

        if (bet >= credit) swal('¡Ops!', 'No puedes apostar un monto mayor al crédito', 'error')
        else if (bet < 0) swal('¡Ops!', 'No puedes ingresar número negativo', 'error')
        else apostar(jugador, bet).then(res => this.setState({credit: res}))
    }

    /** <---- Funciones ----> */

    pedirCarta = (rol, rolID) => {
        const {setHand} = this.props

        if (rolID !== null) {
            peticionPedir(rol, rolID).then(mano => {
                if (rol === 'jugador') {
                    evaluarMano(rolID).then((valor) => {
                        this.setState({score_jugador: valor})
                        if (this.state.score_jugador > 21) {
                            swal("Oops perdiste!", 'Rebasaste la casa o tienes mas de 21 en tu mano', 'error')
                            finalizarPartida().then(res => {
                                setHand("croupier", res.data.croupier)
                                this.setState({
                                    score_jugador: res.data.score_jugador,
                                    score_croupier: res.data.score_croupier,
                                    partida_finalizada: true
                                })
                            })
                        }
                    })
                    setHand(rol, mano)
                }
                //La mano croupier, 2 score
                if (rol === 'croupier') {
                    evaluarMano(rolID).then((valor) => {
                        this.setState({score_croupier: valor})
                        console.log("valor", this.state.score_croupier)
                        if (this.state.score_croupier < 17) {
                            // console.log("La casa quiere pedir otra carta")
                            setHand(rol, mano)
                            peticionPedir(rol, rolID).then(mano => setHand(rol, mano))
                        }
                        if (this.state.score_croupier >= 17) {
                            // console.log("Se finaliza partida")
                            finalizarPartida().then(res => {
                                setHand("croupier", res.data.croupier)
                                this.setState({
                                    score_jugador: res.data.score_jugador,
                                    score_croupier: res.data.score_croupier,
                                    partida_finalizada: true
                                })
                            })
                        }
                        if (this.state.score_croupier > 21) {
                            // console.log("La casa tiene mas de 21, pierde")
                            finalizarPartida().then(res => {
                                setHand("croupier", res.data.croupier)
                                this.setState({
                                    score_jugador: res.data.score_jugador,
                                    score_croupier: res.data.score_croupier,
                                    partida_finalizada: true
                                })
                            })
                        }
                    })

                }

            })
        }
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
        const {jugador, croupier} = this.props
        const {credit, bet, score_croupier, score_jugador, partida_finalizada} = this.state

        /** Izquierda es true y derecha es false */
        let cartasJugador = this.crearCartas(jugador, false)
        let cartasCroupier = this.crearCartas(croupier, true)

        let winner
        if (score_jugador <= 21 && (score_jugador > score_croupier || score_jugador < score_croupier) ) {
            winner = (<>
                <span>You win</span>
            </>)
        } else if(score_croupier <= 21 && score_croupier > score_jugador) {
            winner = (<>
                <span>You lose</span>
            </>)
        } else {
            winner = (<>
                <span>You win</span>
            </>)
        }

        return (
            <>
                <div className="wrapper">
                    <div className="naipesL">
                        {cartasCroupier}
                    </div>

                    <div className="naipesR">
                        {cartasJugador}
                    </div>
                </div>
                <div className="container row">
                    <div className="col m4 s12 center-align">
                        <h5>Creditos: {credit}$</h5>
                    </div>
                    <div className="col m4 s12 center-align">
                        {partida_finalizada && (
                            <>
                                <h5>Score final</h5>
                                <br/>
                                <h6>{score_croupier}{" "} - {" "}{score_jugador}</h6>
                            </>
                        )}
                    </div>
                    <h5 className={partida_finalizada ? "col m4 s12 center-align": "hide col m4 s12 center-align"}>
                        {winner}
                    </h5>
                </div>
                <div className="container row flex-align-center">
                    <div className="col m4 s12 flex-align-center">
                        <div className="input-field">
                            <input value={bet} type="number" onChange={this.handleInputBet}/>
                        </div>
                        <button onClick={this.handleWallet} className="waves-effect waves-light btn"
                                disabled={partida_finalizada}>
                            Apostar
                        </button>
                    </div>
                    <div className="col m4 s12 center-align">
                        <button onClick={() => this.pedirCarta("jugador", jugador.id)}
                                className="waves-effect waves-light btn"
                                disabled={credit === 100 || partida_finalizada}>
                            Pedir
                        </button>
                    </div>
                    <div className="col m4 s12 center-align">
                        <button onClick={() => this.pedirCarta("croupier", croupier.id)}
                                className="waves-effect waves-light btn"
                                disabled={credit === 100 || partida_finalizada}>
                            Plantarse
                        </button>
                    </div>

                </div>
            </>
        )
    }
}

export default Naipes
