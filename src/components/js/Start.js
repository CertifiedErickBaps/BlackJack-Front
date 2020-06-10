import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

class Start extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            redirectTo: ''
        }
    }

    crear = () => {
        this.setState({redirect: true, redirectTo: '/crear'})
    }

    unirse = () => {
        this.setState({redirect: true, redirectTo: '/unirse'})
    }

    render() {
        const {redirectTo} = this.state

        return (
            <>
                <div className="login-form">
                    <div className="row">
                        <div className="row">
                            <button type="submit" className="waves-effect waves-light btn" onClick={this.crear}>
                                Crear partida
                            </button>
                        </div>
                        <div className="row">
                            <button type="submit" className="waves-effect waves-light btn" onClick={this.unirse}>
                                Unirse partida
                            </button>
                        </div>
                    </div>
                </div>
                {redirectTo && (<Redirect to={redirectTo}/>)}
            </>
        )
    }
}

export default Start