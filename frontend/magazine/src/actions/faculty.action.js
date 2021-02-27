import { facultyConstants } from './constants'

export const getFaculty = () => {
    return async dispatch => {
        const token = localStorage.getItem('token')
        dispatch({ type: facultyConstants.GET_FACULTY_REQUEST })
        const res = await fetch('http://localhost:5000/api/faculty/getFaculty', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        const data = await res.json()
        const { faculty, error } = data
        if (res.status === 200) {
            dispatch({
                type: facultyConstants.GET_FACULTY_SUCCESS,
                payload: { faculty }
            })
        } else {
            dispatch({
                type: facultyConstants.GET_FACULTY_FAILURE,
                payload: { error }
            })
        }
    }
}
