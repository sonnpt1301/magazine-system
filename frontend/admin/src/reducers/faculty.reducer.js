/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { facultyConstants } from '../actions/constants'

const initState = {
    faculties: [],
    loading: false,
    error: null
}

let newFaculty = []

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
        case facultyConstants.ADD_FACULTY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case facultyConstants.ADD_FACULTY_SUCCESS:
            newFaculty = [...state.faculties]
            newFaculty.push(action.payload.faculty)
            state = {
                ...state,
                faculties: newFaculty,
                loading: false
            }
            break;
        case facultyConstants.ADD_FACULTY_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case facultyConstants.UPDATE_FACULTY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case facultyConstants.UPDATE_FACULTY_SUCCESS:
            newFaculty = [...state.faculties]
            const updateFaculty = newFaculty.findIndex(fac => fac._id === action.payload.faculty._id)
            newFaculty[updateFaculty] = action.payload.faculty
            state = {
                ...state,
                faculties: newFaculty,
                loading: false
            }
            break;
        case facultyConstants.UPDATE_FACULTY_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;
        case facultyConstants.DELETE_FACULTY_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case facultyConstants.DELETE_FACULTY_SUCCESS:
            newFaculty = [...state.faculties]
            const updateFacultyArr = newFaculty.filter(fac => fac._id !== action.payload.faculty._id)
            state = {
                ...state,
                faculties: updateFacultyArr,
                loading: false
            }
            break;
        case facultyConstants.DELETE_FACULTY_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;

    }
    return state
}

