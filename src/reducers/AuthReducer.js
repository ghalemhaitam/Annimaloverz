import { LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_ATTEMPT, LOGOUT_SUCCESS, LOGOUT_FAILED } from '../actions/types'

const INITIAL_STATE = { loading: false, user: null, error: '' }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_ATTEMPT:
            return { ...state, loading: true, user: null, error: '' }
        case LOGIN_SUCCESS:
            return { ...state, loading: false, user: action.user, error: '' }
        case LOGIN_FAILED:
            return { ...state, loading: false, user: null, error: action.error }
        case LOGOUT_ATTEMPT:
            return { ...state, loading: true, user: null, error: '' }
        case LOGOUT_SUCCESS:
            return { ...state, loading: false, user: null, error: '' }
        case LOGOUT_FAILED:
            return { ...state, loading: false, user: null, error: action.error }
        default:
            return state
    }
}
