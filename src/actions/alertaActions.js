import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../types";

//Muestra un alerta

export function mostrarAlerta(alerta){

    return (dispatch) => {
        dispatch(crearAlerta(alerta))
    }
}

const crearAlerta = alerta => ({

    type: MOSTRAR_ALERTA,
    payload : alerta
})

//Ocultar alerta

export function ocultarAlertaActions() {
    return (dispatch) => {
        dispatch(ocultarAlerta())
    }
}

const ocultarAlerta = () => ({
    type: OCULTAR_ALERTA
})