import { termConstants } from './constants'
import { api } from '../urlConfig'
export const getTerms = () => {
    return async dispatch => {
        dispatch({ type: termConstants.GET_TERMS_REQUEST })
        const token = localStorage.getItem('token')
        const res = await fetch(`${api}/term/getClosureDate`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()
        const { closureDates, error } = data
        if (res.status === 200) {
            dispatch({
                type: termConstants.GET_TERMS_SUCCESS,
                payload: { closureDates }
            })
        } else {
            dispatch({
                type: termConstants.GET_TERMS_FAILURE,
                payload: { error }
            })
        }
    }
}
