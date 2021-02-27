/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { facultyConstants } from '../actions/constants'

const initState = {
    faculties: [],
    loading: false,
    error: null
}


export default (state = initState, action) => {
    switch (action.type) {
        case facultyConstants.GET_FACULTY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case facultyConstants.GET_FACULTY_SUCCESS:
            state = {
                ...state,
                faculties: action.payload.faculty,
                loading: false
            }
            break;
        case facultyConstants.GET_FACULTY_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;
    }
    return state
}

