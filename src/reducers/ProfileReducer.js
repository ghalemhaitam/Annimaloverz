import { PROFILE_FETCHING, PROFILE_SWITCHED } from '../actions/types'

const INITIAL_STATE = { loading: false, profile: null }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROFILE_FETCHING:
            return { ...state, loading: true, profile: null }
        case PROFILE_SWITCHED:
            return { ...state, loading: false, profile: action.profile }
        default:
            return state
    }
}
