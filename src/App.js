import React, { Component } from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css'
import './App.css'
import Login from './components/js/Login'
import Game from './components/js/Game'
import WaitRoom from './components/js/WaitRoom'
import Error404 from './components/js/Error404'

class App extends Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={Login} exact />
                        <Route path="/sala-espera" component={WaitRoom} exact/>
                        <Route path="/jugar-partida" component={Game} exact />
                        <Route component={Error404} />
                    </Switch>
                </BrowserRouter>
            </>
        );
    }
}

export default App;
