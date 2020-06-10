import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Axios from 'axios'
import Materialize from "materialize-css"
import '../css/Login.css'

class Join extends Component {

    constructor(props) {

        super(props)

        this.state = {
            nombre: '',
            redirect: false,
            redirectTo: '',
            pin: ''
        }

    }

    componentDidMount() {
        /** Initialize the animations of materialize */
        Materialize.AutoInit()
    }

    /** Comunicacion con el servidor */
    unirsePartida = () => {
        const {actualizarSesionJugador} = this.props
        const {nombre, pin} = this.state

        Axios({
            method: 'post',
            url: `http://${process.env.REACT_APP_LOCALHOST}/unirse-partida`,
            data: {
                nombre: nombre,
                pin: pin
            }
        }).then((res) => {
            this.setState({
                redirect: true,
                redirectTo: '/sala-espera'
            })

            actualizarSesionJugador(res.data.id_jugador)
        }).catch(() => {
            this.setState({
                redirect: true,
                redirectTo: '/crear'
            })
        })
    }

    handleInput = (evt) => {
        evt.preventDefault()
        const {value, name} = evt.target
        this.setState({[name]: value})
    }

    render() {
        const {redirect, nombre, pin, redirectTo} = this.state

        let disabled = !pin || !nombre

        return (
            <>
                <div className="login-form">
                    <div className="row">
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea name="nombre" onChange={this.handleInput} className="materialize-textarea"/>
                                <label htmlFor="textarea1">Nombre</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea name="pin" onChange={this.handleInput} className="materialize-textarea"/>
                                <label htmlFor="textarea2">Pin</label>
                            </div>
                        </div>
                        <div className="row">
                            <button type="submit" disabled={disabled} className="waves-effect waves-light btn has-margin-right"
                                    onClick={this.unirsePartida}>
                                Entrar
                            </button>
                            <a href="/" type="submit" className="waves-effect waves-light btn">
                                Regresar
                            </a>
                        </div>
                    </div>
                </div>
                {redirect && (<Redirect to={redirectTo}/>)}
            </>
        )
    }
}

export default Join
