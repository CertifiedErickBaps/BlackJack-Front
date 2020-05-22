import React, { Component } from "react";

import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";

import Login from "./components/Login";
import Game from "./components/Game";
import Error404 from "./components/Error404";

function RoomGame(props) {
    return (
        <>
            <div>Id de sala {props.id}</div>
        </>
    );
}

class App extends Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={Login} exact />
                        <Route
                            path="/unirse-partida"
                            render={() => <RoomGame id="1" />}
                        />
                        <Route path="/jugar-partida" component={Game} />
                        <Route component={Error404} />;
                    </Switch>
                </BrowserRouter>
            </>
        );
    }
}

export default App;
