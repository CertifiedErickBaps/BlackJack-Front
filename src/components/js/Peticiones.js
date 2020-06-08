import Axios from "axios";

export const apostar = async (jugador, bet) => {
    let credit = 0;
    await Axios.post(`http://${process.env.REACT_APP_LOCALHOST}/apostar`, {
        id: jugador.id,
        cantidad: bet
    }).then((res) => {
        credit = res.data.credito
        bet = ""
    }).catch((err) => {
        console.log(err)
    })

    return credit
}

export const evaluarMano = async (rolID) => {
    let valor = -1

    await Axios.post(`http://${process.env.REACT_APP_LOCALHOST}/evaluar-mano`, {
        id: rolID
    }).then((res) => {
        valor = res.data.valor
    }).catch((err) => {
        console.log(err)
    })

    return valor
}

export const peticionPedir = async (rol, rolID) => {
    let mano = []

    await Axios.post(`http://${process.env.REACT_APP_LOCALHOST}/pedir`, {
        id: rolID
    }).then((res) => {
        mano = res.data.mano
    }).catch((err) => {
        console.log(err)
    })

    return mano
}

export const finalizarPartida = async () => {
    let partida = {}
    await Axios.get(`http://${process.env.REACT_APP_LOCALHOST}/evaluar-partida`).then((res) => {
        partida = res
    }).catch((err) => {
        console.log(err)
    })
    return partida
}