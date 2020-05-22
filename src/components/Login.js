import React, {Component} from "react"
import Axios from 'axios'
import M from "materialize-css"
import "./Login.css";

class Login extends Component {

    constructor(props) {

        super(props)

        this.state = {
            nombre: "",
            multijugador: false,
        }

    }

    componentDidMount() {

        /** Initialize the animations of materialize */
        M.AutoInit()

    }

    loginUsuario = () => {
        /** Comunicacion con el servidor */

        const {nombre, multijugador} = this.state

        Axios.post(`http://${process.env.REACT_APP_HOST_PORT}/crear-partida`, {
            nombre: nombre,
            multijugador: multijugador === 'true'
        }).then((res) => {

            const {id_partida, multijugador} = res.data
            console.log(id_partida, multijugador)

        }).catch((err) => {

            console.log(err)

        })

    }

    handleInput = (evt) => {

        evt.preventDefault()

        const {value, name} = evt.target

        this.setState({[name]: value})

    }


    render() {
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
                                    <option disabled selected>Choose your option</option>
                                    <option value={true} className="white">Si</option>
                                    <option value={false} className="red-text">No</option>
                                </select>
                                <label>Multijugador</label>
                            </div>
                        </div>
                        <button type="submit" className="waves-effect waves-light btn" onClick={this.loginUsuario}>
                            Entrar
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

export default Login;
