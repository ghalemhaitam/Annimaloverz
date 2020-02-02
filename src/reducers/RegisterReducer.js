import { REGISTER_ATTEMPT, REGISTER_SUCCESS, REGISTER_FAILED } from '../actions/types'

const INITIAL_STATE = { loading: false, user: null, error: '' }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER_ATTEMPT:
            return { ...state, loading: true, user: null, error: '' }
        case REGISTER_SUCCESS:
            return { ...state, loading: false, user: action.user, error: '' }
        case REGISTER_FAILED:
            return { ...state, loading: false, user: null, error: action.error }
        default:
            return state
    }
}
