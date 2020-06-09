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
        }

    }

    componentDidMount() {

        /** Initialize the animations of materialize */
        Materialize.AutoInit()

    }

    loginUsuario = () => {

        /** Comunicacion con el servidor */
        const {nombre, multijugador} = this.state

        Axios.post(`http://${process.env.REACT_APP_LOCALHOST}/crear-partida`, {
            nombre: nombre,
            multijugador: multijugador === 'true'
        }).then(() => {

            this.setState({redirect: true})

        }).catch(() => {

            console.info('error conection with server, init debugging')

            this.setState({
                nombre: 'SkDv',
                redirect: true
            })

        })


    }

    handleInput = (evt) => {
        evt.preventDefault()
        const {value, name} = evt.target
        this.setState({[name]: value})
    }


    render() {
        const {redirect, nombre, multijugador} = this.state

        let disabled = !nombre || !multijugador

        console.log(multijugador)

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
                        <button type="submit" disabled={disabled} className="waves-effect waves-light btn"
                                onClick={this.loginUsuario}>
                            Entrar
                        </button>
                    </div>
                </div>
                {redirect && (<Redirect push to={{
                    pathname: "/jugar-partida",
                    multijugador: multijugador
                }}/>)}
            </>
        )
    }
}

export default Login
