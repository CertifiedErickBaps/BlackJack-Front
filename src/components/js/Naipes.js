import React, {Component} from 'react'
import '../css/Naipes.css'
import Card from './Card'
import Axios from 'axios'
import swal from 'sweetalert'

class Naipes extends Component {
    constructor(props) {

        super(props)

        this.state = {
            left_card: 3,
            right_card: 3,
            bet: "",
            credit: 100,
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

        if (bet >= credit) swal('¡Ops!', 'No puedes apostar un monto mayor al crédito', 'error')
        else if (bet < 0) swal('¡Ops!', 'No puedes ingresar número negativo', 'error')
        else this.apostar()
    }

    /** <---- Peticiones ----> */

    apostar = () => {
        const {jugador} = this.props
        const {bet} = this.state

        Axios.post(`http://${process.env.REACT_APP_LOCALHOST}/apostar`, {
            id: jugador.id,
            cantidad: bet
        }).then((res) => {
            this.setState({credit: res.data.credito, bet: ""})
        }).catch((err) => {
            console.log(err)
        })
    }

    evaluarMano = async (rolID) => {
        let valor = -1

        await Axios.post(`http://${process.env.REACT_APP_LOCALHOST}/evaluar-mano`, {
            id: rolID
        }).then((res) => {
            valor = res.data.valor
        }).catch((err) => {
            console.log(err)
        })

        return valor
    }

    peticionPedir = async (rol, rolID) => {
        let mano = []

        await Axios.post(`http://${process.env.REACT_APP_LOCALHOST}/pedir`, {
            id: rolID
        }).then((res) => {
            mano = res.data.mano
        }).catch((err) => {
            console.log(err)
        })

        return mano
    }

    evaluarManoCroupier = () => {
        const {setHand} = this.props

        Axios.get(`http://${process.env.REACT_APP_LOCALHOST}/evaluar-partida`).then((res) => {
            setHand('croupier', res.data.mano)
        }).catch((err) => {
            console.log(err)
        })
    }

    /** <---- Funciones ----> */

    pedirCarta = (rol, rolID) => {
        const {setHand} = this.props

        if (rolID !== null) {
            this.peticionPedir(rol, rolID).then((mano) => {

                if (rol === 'jugador') {
                    this.evaluarMano(rolID).then((valor) => {
                        if (valor > 21) {
                            swal("Oops perdiste!", 'Rebasaste la casa o tienes mas de 21 en tu mano qlo', 'error')
                            this.evaluarManoCroupier()
                        }
                    })
                } else {
                    this.evaluarMano(rolID).then((valor) => {
                        console.log(valor)
                    })
                }

                setHand(rol, mano)
            })
        }
    }

    verificarCroupier = () => {
        const {croupier} = this.props
        const {scoreCasa} = this.state

        if (scoreCasa <= 17) this.pedirCarta('croupier', croupier.id)
        else this.evaluarManoCroupier()
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
        const {credit, bet} = this.state

        /** Izquierda es true y derecha es false */
        let cartasJugador = this.crearCartas(jugador, false)
        let cartasCroupier = this.crearCartas(croupier, true)

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
                        <span>{}</span>
                    </div>
                </div>
                <div className="container row flex-align-center">
                    <div className="col m4 s12 flex-align-center">
                        <div className="input-field">
                            <input value={bet} type="number" onChange={this.handleInputBet}/>
                        </div>
                        <button onClick={this.handleWallet} className="waves-effect waves-light btn">
                            Apostar
                        </button>
                    </div>
                    <div className="col m4 s12 center-align">
                        <button onClick={() => this.pedirCarta("jugador", jugador.id)} className="waves-effect waves-light btn"
                                disabled={credit === 100}>
                            Pedir
                        </button>
                    </div>
                    <div className="col m4 s12 center-align">
                        <button onClick={() => this.verificarCroupier()} className="waves-effect waves-light btn"
                                disabled={credit === 100}>
                            Plantarse
                        </button>
                    </div>

                </div>
            </>
        )
    }
}

export default Naipes
