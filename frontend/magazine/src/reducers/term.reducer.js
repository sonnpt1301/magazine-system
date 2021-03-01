/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { termConstants } from '../actions/constants'

const initState = {
    terms: [],
    loading: false,
    error: null
}

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
    }
    return state
}