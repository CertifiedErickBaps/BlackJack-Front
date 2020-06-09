import React, {Component} from 'react'
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
            multijugador: false
        }

    }

    reiniciarPartida = () => {
        this.setState({finalizar: 'habilitado'})
    }

    componentDidMount() {
        Axios.get(`http://${process.env.REACT_APP_LOCALHOST}/iniciar`).then((res) => {
            console.log(res.data);
            this.setState({
                jugador: res.data.jugador,
                croupier: res.data.croupier,
                multijugador: this.props.location.multijugador === "true"
            })
        }).catch(() => {
            this.setState({
                jugador: repartir.jugador,
                croupier: repartir.croupier
            })
        })
    }

    setHand = (name, hand) => {
        let copy = this.state[name]
        copy.mano = hand
        this.setState({
            [name]: copy
        })
    }

    render() {
        const {jugador, croupier, multijugador, finalizar} = this.state

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
            setHand: this.setHand,
            reiniciarPartida: this.reiniciarPartida
        }

        return (
            <>
                <div className="flex-align-center">
                    <img src={logo} className="logo" alt=""/>
                </div>

                <nav>

                    <div className="nav-wrapper nav-color">
                        <ul id="nav-mobile" className="left">
                            <li>
                                <a href="/">Jugadores en sala{' '}{jugadores}{' '}</a>
                            </li>

                        </ul>
                        <ul id="nav-mobile" className="padding-right-1 right">
                            <button className="waves-effect waves-light btn" disabled={finalizar === 'deshabilitado'}>
                                Seguir jugando
                            </button>
                        </ul>


                    </div>
                </nav>
                <Naipes {...naipesProps}/>
            </>
        )
    }
}

export default Game;
