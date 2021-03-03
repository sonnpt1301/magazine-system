/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { contributionConstants } from '../actions/constants'

const initState = {
    statistic: [],
    loading: false,
    error: null
}

export default (state = initState, action) => {
    switch (action.type) {
        case contributionConstants.GET_STATISTIC_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case contributionConstants.GET_STATISTIC_SUCCESS:
            state = {
                ...state,
                statistic: action.payload.statistic,
                loading: false
            }
            break;
        case contributionConstants.GET_STATISTIC_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;


    }
    return state
}
