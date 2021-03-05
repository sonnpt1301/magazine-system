import swal from 'sweetalert'
import { termConstants } from './constants'

export const getTerms = () => {
    return async dispatch => {
        dispatch({ type: termConstants.GET_TERMS_REQUEST })
        const token = localStorage.getItem('token')
        const res = await fetch('https://magazine-system-be.herokuapp.com/api/term/getClosureDate', {
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

export const setClosureDate = (body) => {
    return async dispatch => {
        const token = localStorage.getItem('token')
        dispatch({ type: termConstants.ADD_TERMS_REQUEST })
        const res = await fetch('https://magazine-system-be.herokuapp.com/api/term/setClosureDate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        const data = await res.json()
        const { closureDate, error } = data
        if (res.status === 201) {
            dispatch({
                type: termConstants.ADD_TERMS_SUCCESS,
                payload: { closureDate }
            })
            return await swal("Congratulation", "You have been created successfully", "success")
        } else {
            dispatch({
                type: termConstants.ADD_TERMS_FAILURE,
                payload: { error }
            })
            return await swal("Failed", error, "error")
        }
    }
}

export const updateClosureDate = (params, body) => {
    return async dispatch => {
        const { termId } = params
        const token = localStorage.getItem('token')
        dispatch({ type: termConstants.UPDATE_TERMS_REQUEST })
        const res = await fetch(`https://magazine-system-be.herokuapp.com/api/term/editClosureDate/${termId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        const data = await res.json()
        const { closureDate, error } = data
        if (res.status === 200) {
            dispatch({
                type: termConstants.UPDATE_TERMS_SUCCESS,
                payload: { closureDate }
            })
            return await swal("Congratulation", "You have been created successfully", "success")
        } else {
            dispatch({
                type: termConstants.UPDATE_TERMS_FAILURE,
                payload: { error }
            })
            return await swal("Failed", error, "error")
        }
    }
}
