import React, {Component} from 'react'
import '../css/Naipes.css'
import Card from './Card'
import Axios from 'axios'

class Naipes extends Component {
    constructor(props) {

        super(props)

        this.state = {
            left_card: 3,
            right_card: 3,
            input: "",
            wallet: 100,
            score_jugador: 0,
            score_casa: 0,
        }

    }

    /** Evento para pedir otra carta aletoria */
    handleEventCard = (evt) => {

        this.setState((prevState) => ({
            right_card: prevState.right_card + 3
        }))

    };

    /** Evento para obtener el input del usuario */
    handleInputWallet = (evt) => {

        evt.preventDefault()

        this.setState({
            input: evt.target.value,
        })

    }

    /** Evento para restar al wallet */
    handleWallet = () => {
        //Checa que el wallet no sea negativo y que lo que pueda apostar el usuario no sea mayor a lo que tiene actualmente.
        if (!(this.state.wallet < 0) && (this.state.input <= this.state.wallet)) {
            this.setState({wallet: this.state.wallet - this.state.input,});
        }
    }

    createCards = (rol, side) => {

        let cartas
        if (rol != null) {

            let space = -3

            cartas = rol.mano.map((carta, i) => {

                space += 3
                return side ?
                    (<Card key={i} value={carta.carta} visible={carta.visible} style={{left: `${space}rem`}} styleCard="naipe-selectionL"/>) :
                    (<Card key={i} value={carta.carta} visible={carta.visible} style={{right: `${space}rem`}} styleCard="naipe-selectionR"/>)

            })

        }

        return cartas

    }

    getScore = (rol, rolID) => {

        if (rolID !== null) {

            Axios.post(`http://${process.env.REACT_APP_LOCALHOST}/evaluar-mano`, {
                id: rolID
            }).then((res) => {

                this.setState({[rol]: res.data.valor})

            }).catch((err) => {

                console.log(err)

            })

        }

    }

    render() {

        const {jugador, croupier} = this.props
        const {score_jugador, score_casa} = this.state

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
                        <h5>Creditos: {this.state.wallet}$</h5>
                    </div>
                    <div className="col m4 s12 center-align">
                        <span>You win 12-18</span>
                    </div>
                </div>
                <div className="container row flex-align-center">
                    <div className="col m4 s12 flex-align-center">
                        <div className="input-field">
                            <input type="number" onChange={this.handleInputWallet}/>
                        </div>
                        <button onClick={this.handleWallet} className="waves-effect waves-light btn">
                            Apostar
                        </button>
                    </div>
                    <div className="col m4 s12 center-align">
                        <button onClick={this.handleEventCard} className="waves-effect waves-light btn">
                            Pedir
                        </button>
                    </div>
                    <div className="col m4 s12 center-align">
                        <button className="waves-effect waves-light btn">
                            Plantarse
                        </button>
                    </div>

                </div>
            </>
        );
    }
}

export default Naipes;
