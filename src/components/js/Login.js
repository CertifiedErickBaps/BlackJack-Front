import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Axios from 'axios'
import Materialize from "materialize-css"
import '../css/Login.css'

class Login extends Component {

    constructor(props) {

        super(props)

        this.state = {
            nombre: '',
            multijugador: 'false',
            redirect: false,
            redirectTo: '',
        }

    }

    componentDidMount() {
        /** Initialize the animations of materialize */
        Materialize.AutoInit()
    }

    /** Comunicacion con el servidor */
    loginUsuario = () => {
        const {configurarVistaJugador} = this.props
        const {nombre, multijugador} = this.state

        Axios.post(`http://${process.env.REACT_APP_LOCALHOST}/crear-partida`, {
            nombre: nombre,
            multijugador: multijugador === 'true'
        }).then((res) => {
            this.setState({
                redirect: true,
                redirectTo: '/jugar-partida'
            })

            configurarVistaJugador(res.data.id_partida, res.data.id_jugador, nombre)
        })
    }

    handleInput = (evt) => {
        evt.preventDefault()
        const {value, name} = evt.target
        this.setState({[name]: value})
    }

    render() {
        const {redirect, nombre, multijugador, redirectTo} = this.state

        // console.log(multijugador)
        let disabled = !nombre || !multijugador

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
                                <select name="multijugador" onChange={this.handleInput}>
                                    <option selected disabled>Choose your option</option>
                                    <option value={true} className="white">Si</option>
                                    <option value={false} className="red-text">No</option>
                                </select>
                                <label>Multijugador</label>
                            </div>
                        </div>
                        <div className="row">
                            <button type="submit" disabled={disabled} className="waves-effect waves-light btn has-margin-right"
                                    onClick={this.loginUsuario}>
                                Entrar
                            </button>
                            <a href="/" type="submit" className="waves-effect waves-light btn">
                                Regresar
                            </a>
                        </div>
                    </div>
                </div>
                {redirect && (<Redirect push to={redirectTo}/>)}
            </>
        )
    }
}

export default Login
