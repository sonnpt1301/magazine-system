import { userConstants } from './constants'

export const getUsers = () => {
    const token = localStorage.getItem('token')

    return async dispatch => {
        dispatch({ type: userConstants.GET_USERS_REQUEST })
        const res = await fetch('http://localhost:5000/api/user/get-users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        const data = await res.json()
        const { user, error } = data
        if (res.status === 200) {
            dispatch({
                type: userConstants.GET_USERS_SUCCESS,
                payload: { user }
            })
        } else {
            dispatch({
                type: userConstants.GET_USERS_FAILURE,
                payload: { error }
            })
        }
    }
}