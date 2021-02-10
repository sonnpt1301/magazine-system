import { facultyConstants } from './constants';
import axios from '../helper/axios'

export const getFaculty = () => {
    return async dispatch => {
        dispatch({ type: facultyConstants.GET_FACULTY_REQUEST })
        const res = await axios.get('/faculty/getFaculty')
        const { faculty, error } = res.data
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

export const addFaculty = (body) => {
    return async dispatch => {
        dispatch({ type: facultyConstants.ADD_FACULTY_REQUEST })
        const res = await axios.post('/faculty/createFaculty', body)
        const { faculty, error } = res.data
        if (res.status === 201) {
            dispatch({
                type: facultyConstants.ADD_FACULTY_SUCCESS,
                payload: { faculty }
            })
        } else {
            dispatch({
                type: facultyConstants.ADD_FACULTY_FAILURE,
                payload: { error }
            })
        }
    }
}