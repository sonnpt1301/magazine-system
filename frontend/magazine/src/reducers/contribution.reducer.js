import { contributionConstants } from '../actions/constants'

/* eslint-disable import/no-anonymous-default-export */
const initState = {
    allContributions: [],
    comments: [],
    loading: false,
    error: null
}

let newContribution
let updateContribution
let allContribution
let newComment

export default (state = initState, action) => {
    switch (action.type) {
        // GET_ALL_CONTRIBUTION
        case contributionConstants.GET_ALL_CONTRIBUTION_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case contributionConstants.GET_ALL_CONTRIBUTION_SUCCESS:
            state = {
                ...state,
                allContributions: action.payload.contributions,
                loading: true
            }
            break;
        case contributionConstants.GET_ALL_CONTRIBUTION_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;

        // ADD_CONTRIBUTION
        case contributionConstants.ADD_CONTRIBUTION_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case contributionConstants.ADD_CONTRIBUTION_SUCCESS:
            newContribution = [...state.allContributions]
            newContribution.push(action.payload.contribution[0])
            state = {
                ...state,
                allContributions: newContribution,
                loading: false
            }
            break;
        case contributionConstants.ADD_CONTRIBUTION_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;

        //UPDATE_CONTRIBUTION
        case contributionConstants.UPDATE_CONTRIBUTION_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case contributionConstants.UPDATE_CONTRIBUTION_SUCCESS:
            updateContribution = [...state.allContributions]
            const indexUpdatedContribution = updateContribution.findIndex(contr => contr._id === action.payload.contribution[0]._id)
            updateContribution[indexUpdatedContribution] = action.payload.contribution[0]
            state = {
                ...state,
                allContributions: updateContribution,
                loading: false
            }
            break;
        case contributionConstants.UPDATE_CONTRIBUTION_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;

        // PUBLISH_CONTRIBUTION
        case contributionConstants.PUBLISH_CONTRIBUTION_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case contributionConstants.PUBLISH_CONTRIBUTION_SUCCESS:
            allContribution = [...state.allContributions]
            const updatedContribution = allContribution.findIndex(x => x._id === action.payload.publishedContribution[0]._id)
            allContribution[updatedContribution] = action.payload.publishedContribution[0]
            state = {
                ...state,
                allContributions: allContribution,
                loading: false
            }
            break;
        case contributionConstants.PUBLISH_CONTRIBUTION_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;

        // GET_COMMENT
        case contributionConstants.GET_COMMENT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break; case contributionConstants.GET_COMMENT_SUCCESS:
            state = {
                ...state,
                comments: action.payload.listComment,
                loading: false
            }
            break;
        case contributionConstants.GET_COMMENT_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;

        // ADD_COMMENT
        case contributionConstants.ADD_COMMENT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case contributionConstants.ADD_COMMENT_SUCCESS:
            newComment = [...state.comments]
            newComment.push(action.payload.comment)
            state = {
                ...state,
                comments: newComment,
                loading: false
            }
            break;
        case contributionConstants.ADD_COMMENT_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        default:
            break;
    }
    return state
}