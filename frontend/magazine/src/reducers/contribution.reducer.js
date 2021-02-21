import { contributionConstants } from '../actions/constants'

/* eslint-disable import/no-anonymous-default-export */
const initState = {
    allContributions: [],
    publicContributions: [],
    contributionByFaculties: [],
    loading: false,
    error: null
}

let newContribution
let allContribution
let publishedContribution
let contributionByFaculty

export default (state = initState, action) => {
    switch (action.type) {
        // GET_PUBLIC_CONTRIBUTION
        case contributionConstants.GET_PUBLIC_CONTRIBUTION_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case contributionConstants.GET_PUBLIC_CONTRIBUTION_SUCCESS:
            state = {
                ...state,
                publicContributions: action.payload.contributions,
                loading: true
            }
            break;
        case contributionConstants.GET_PUBLIC_CONTRIBUTION_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
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
        // GET_CONTRIBUTION_BY_FACULTY
        case contributionConstants.GET_CONTRIBUTION_BY_FACULTY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case contributionConstants.GET_CONTRIBUTION_BY_FACULTY_SUCCESS:
            state = {
                ...state,
                contributionByFaculties: action.payload.contributions,
                loading: true
            }
            break;
        case contributionConstants.GET_CONTRIBUTION_BY_FACULTY_FAILURE:
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
            newContribution.push(action.payload.contribution)
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

            publishedContribution = [...state.publicContributions]
            publishedContribution.push(action.payload.publishedContribution[0])
            
            contributionByFaculty = [...state.contributionByFaculties]
            const updatedContributionByFaculty = contributionByFaculty.findIndex(x => x._id === action.payload.publishedContribution[0]._id)
            contributionByFaculty[updatedContributionByFaculty] = action.payload.publishedContribution[0]
            state = {
                ...state,
                allContributions: allContribution,
                publicContributions: publishedContribution,
                contributionByFaculties: contributionByFaculty,
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
        default:
            break;
    }
    return state
}