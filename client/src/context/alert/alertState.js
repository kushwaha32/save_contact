import { useReducer } from "react"
import { v4 } from "uuid";
import { REMOVE_ALERT, SET_ALERT } from "../type";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";


const AlertState = props => {
    const initialSate = [];

    const [state, dispatch] = useReducer(alertReducer, initialSate);


    // Set Alert

    const setAlert = (msg, type, timeout = 5000) => {
        const id = v4();
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id }
        })

        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)
    }

    return(
        <AlertContext.Provider
        value={{
          alerts: state,
          setAlert
        }}>
            { props.children }
        </AlertContext.Provider>
    );
}


export default AlertState;