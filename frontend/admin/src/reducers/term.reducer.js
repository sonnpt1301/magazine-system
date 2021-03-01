/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { termConstants } from '../actions/constants'

const initState = {
    terms: [],
    loading: false,
    error: null
}

let newTerm
let updateTerm

export default (state = initState, action) => {
    switch (action.type) {
        case termConstants.GET_TERMS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case termConstants.GET_TERMS_SUCCESS:
            state = {
                ...state,
                terms: action.payload.closureDates,
                loading: false
            }
            break;
        case termConstants.GET_TERMS_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case termConstants.ADD_TERMS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case termConstants.ADD_TERMS_SUCCESS:
            newTerm = [...state.terms]
            newTerm.push(action.payload.closureDate)
            state = {
                ...state,
                terms: newTerm,
                loading: false
            }
            break;
        case termConstants.ADD_TERMS_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case termConstants.UPDATE_TERMS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case termConstants.UPDATE_TERMS_SUCCESS:
            updateTerm = [...state.terms]
            const updatedTerm = updateTerm.findIndex(term => term._id === action.payload.closureDate._id)
            updateTerm[updatedTerm] = action.payload.closureDate
            state = {
                ...state,
                terms: updateTerm,
                loading: false
            }
            break;
        case termConstants.UPDATE_TERMS_FAILURE:

            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
    }
    return state
}