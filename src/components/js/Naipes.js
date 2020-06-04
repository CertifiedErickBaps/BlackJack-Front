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
            score_jugador: 0,
            score_casa: 0,
        }

    }


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
        else {
            const {jugador} = this.props

            Axios.post(`http://${process.env.REACT_APP_LOCALHOST}/apostar`, {
                id: jugador.id,
                cantidad: bet
            }).then((res) => {
                this.setState({credit: res.data.credito, bet: ""})
            }).catch((err) => {
                console.log(err)
            })
        }

    }

    createCards = (rol, side) => {
        let cartas
        if (rol != null) {
            let space = -3

            cartas = rol.mano.map((carta, i) => {
                space += 3
                return side ?
                    (<Card key={i} value={carta.carta} visible={carta.visible} style={{left: `${space}rem`}}
                           styleCard={carta.visible ? "naipe-selectionL": "naipe-selectionL-hidden"}/>) :
                    (<Card key={i} value={carta.carta} visible={carta.visible} style={{right: `${space}rem`}}
                           styleCard="naipe-selectionR"/>)
            })
        }

        return cartas
    }

    evaluarPartida = () => {
        const {score_jugador} = this.state

        if (score_jugador >= 21) {
            swal("Oops perdiste!", 'Rebasaste la casa o tienes mas de 21 en tu mano qlo', 'error')
        }
    }

    getScore = (rol, rolID) => {
        if (rolID !== null) {
            Axios.post(`http://${process.env.REACT_APP_LOCALHOST}/evaluar-mano`, {
                id: rolID
            }).then((res) => {
                this.setState({[rol]: res.data.valor})
                this.evaluarPartida()
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    getCard = (rolID) => {
        const {jugador, setPlayerHand, setCroupierHand} = this.props

        if (rolID !== null) {
            Axios.post(`http://${process.env.REACT_APP_LOCALHOST}/pedir`, {
                id: rolID
            }).then((res) => {
                setPlayerHand(res.data.mano)
                this.getScore('score_jugador', jugador.id)
                this.getEvaluarPartida()
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    getEvaluarPartida = () => {
        const {setCroupierHand} = this.props
        Axios.get(`http://${process.env.REACT_APP_LOCALHOST}/evaluar-partida`)
            .then((res) => {
                setCroupierHand(res.data.mano)
                console.log(res)
            }).catch((err) => {
            console.log(err)
        })
    }


    render() {
        const {jugador, croupier} = this.props
        const {score_jugador, score_casa, credit, bet} = this.state

        /** Izquierda es true y derecha es false */
        let cartasJugador = this.createCards(jugador, false)
        let cartasCroupier = this.createCards(croupier, true)

        return (
            <>
                <div className="wrapper">
                    <div className="naipesL" onClick={() => this.getScore('score_casa', croupier.id)}>
                        {cartasCroupier}
                        <span className="casa">
                            <h5>Score {score_casa}</h5>
                        </span>
                    </div>

                    <div className="naipesR" onClick={() => this.getScore('score_jugador', jugador.id)}>
                        {cartasJugador}
                        <span className="jugador">
                            <h5>Score {score_jugador}</h5>
                        </span>
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
                        <button onClick={() => this.getCard(jugador.id)} className="waves-effect waves-light btn"
                                disabled={credit === 100}>
                            Pedir
                        </button>
                    </div>
                    <div className="col m4 s12 center-align">
                        <button className="waves-effect waves-light btn" disabled={credit === 100}>
                            Plantarse
                        </button>
                    </div>

                </div>
            </>
        )
    }
}

export default Naipes
