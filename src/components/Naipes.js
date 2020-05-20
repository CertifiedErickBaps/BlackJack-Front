import React, {Component} from "react";
import "./Naipes.css";
import Card from "./Card";

class Naipes extends Component {
    constructor() {
        super();
        this.state = {
            input: "",
            wallet: 100,
            score_jugador: 1,
            score_casa: 1
        };
    };

    //Evento para pedir otra carta aletoria
    handleEventCard = (e) => {
        console.log("Card Clicked to Insert in hand");
    };

    //Evento para obtener el input del usuario
    handleInputWallet = (e) => {
        this.setState({
            input: e.target.value,
        });
    };

    //Evento para restar al wallet
    handleWallet = () => {
        //Checa que el wallet no sea negativo y que lo que pueda apostar el usuario no sea mayor a lo que tiene actualmente.
        if (!(this.state.wallet < 0) && (this.state.input <= this.state.wallet)) {
            this.setState({wallet: this.state.wallet - this.state.input,});
        }
    };

    render() {
        console.log(this.state.input);
        return (
            <>
                <div className="wrapper">
                    <div className="naipesL">
                        <div className="naipe-selectionL"/>
                        <div className="naipe-selectionL"/>
                        <div className="naipe-selectionL"/>
                        <div className="naipe-selectionL"/>
                        <span className="casa">
                            <h5>Score 12</h5>
                        </span>
                    </div>

                    <div className="naipesR">
                        <div className="naipe-selectionR"/>
                        <div className="naipe-selectionR"/>
                        <div className="naipe-selectionR"/>
                        <div onClick={this.handleEventCard} className="naipe-selectionR"/>
                        <span className="jugador">
                            <h5>Score 17</h5>
                        </span>
                    </div>
                </div>
                <div className="container row">
                    <div className="col m4 s12 center-align">
                        <h5>Creditos: {this.state.wallet}$</h5>
                    </div>
                    <div className="col m4 s12 center-align">
                        <span>You win 12-18</span>
                    </div>
                </div>
                <div className="container row flex-align-center">
                    <div className="col m4 s12 flex-align-center">
                        <div className="input-field">
                            <input type="number" onChange={this.handleInputWallet}/>
                        </div>
                        <button onClick={this.handleWallet} className="waves-effect waves-light btn">
                            Apostar
                        </button>
                    </div>
                    <div className="col m4 s12 center-align">
                        <button onClick={this.handleEventCard} className="waves-effect waves-light btn">
                            Pedir
                        </button>
                    </div>
                    <div className="col m4 s12 center-align">
                        <button className="waves-effect waves-light btn">
                            Plantarse
                        </button>
                    </div>

                </div>
                <div className="container">
                    <Card/>
                </div>
            </>
        );
    }
}

export default Naipes;
