import React, {Component} from "react";
import axios from "axios";
import M from "materialize-css";
import "./Login.css";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            nombre: "",
            multijugador: "",
        };
    }

    componentDidMount() {
        //Initialize the animations of materialize
        M.AutoInit();
    }

    loginUsuario(nombre, multijugador) {
        // Comunicacion con el servidor
        fetch("localhost:8080/crear-partida", {
            method: "POST",
            body: JSON.stringify({
                nombre: nombre,
                multijugador: multijugador
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

    }

    handleInput = (e) => {
        const {value, name} = e.target;
        this.setState({
            [name]: value
        });
        console.log(this.state);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8080/crear-partida',
            data: {
                nombre: this.state.nombre,
                multijugador: this.state.multijugador            }
        });
        // fetch("http://127.0.0.1:8080/crear-partida", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         nombre: this.state.nombre,
        //         multijugador: this.state.multijugador
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });
    };

    render() {
        return (
            <>
                <div className="login-form">
                    <div className="row">
                        <form onSubmit={this.handleSubmit} className="col s12">
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
                            <button type="submit" className="waves-effect waves-light btn">Entrar</button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default Login;
