import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css'
import './App.css'
import Login from './components/js/Login'
import Join from './components/js/Join'
import Start from './components/js/Start'
import Game from './components/js/Game'
import Error404 from './components/js/Error404'

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            idPartida: "",
            idJugador: "",
            nombre: ""
        }
    }

    configurarVistaJugador = (idPartida, idJugador, nombre) => {
        this.setState({
            idPartida: idPartida,
            idJugador: idJugador,
            nombre: nombre
        })
    }

    render() {
        let loginProps = {
            configurarVistaJugador: this.configurarVistaJugador
        }, gameProps = {
            game: this.state
        }

        return (
            <>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Start}/>
                        <Route exact
                               path="/crear"
                               component={() => <Login {...loginProps}/>}
                        />
                        <Route exact path="/unirse" component={Join}/>}/>
                        <Route exact
                               path="/jugar-partida"
                               component={() => <Game {...gameProps}/>}
                        />
                        <Route component={Error404}/>
                    </Switch>
                </BrowserRouter>
            </>
        );
    }
}

export default App
