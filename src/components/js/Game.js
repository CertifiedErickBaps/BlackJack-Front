import React, {Component} from 'react'
import Axios from 'axios'
import logo from '../../img/logo-blackjack.png'
import Naipes from './Naipes'
import repartir from '../../models/repartir.json'

class Game extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        if (!Object.keys(this.state).length) {
            Axios.get(`http://${process.env.REACT_APP_LOCALHOST}/iniciar`).then((res) => {
                console.log(res.data);
                this.setState(res.data)
            }).catch(() => {
                this.setState(repartir)
            })
        }
    }

    setPlayerHand = (hand) => {
        let copy = this.state.jugador;
        copy.mano = hand;
        this.setState({
            jugador: copy
        })
    }

    setCroupierHand = (hand) => {
        let copy = this.state.croupier;
        copy.mano = hand;
        this.setState({
            croupier: copy
        })
    }

    render() {
        const {jugador, croupier, multijugador} = this.state

        let exist = (rol) => {
            return rol != null
        }

        let jugador_card = exist(jugador) ? jugador : null
        let croupier_card = exist(croupier) ? croupier : null

        let jugadores = multijugador ? (<span className="jugadores-number">2</span>) : (
            <span className="jugadores-number">1</span>)

        const naipesProps = {
            jugador: jugador_card,
            croupier: croupier_card,
            setPlayerHand: this.setPlayerHand,
            setCroupierHand: this.setCroupierHand,
        }

        return (
            <>
                <div className="flex-align-center">
                    <img src={logo} className="logo" alt=""/>
                </div>
                <nav>
                    <div className="nav-wrapper nav-color">
                        <ul id="nav-mobile" className="left hide-on-med-and-down">
                            <li>
                                <a href="/">Jugadores en sala{' '}{jugadores}{' '}</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Naipes {...naipesProps}/>
            </>
        )
    }
}

export default Game;
