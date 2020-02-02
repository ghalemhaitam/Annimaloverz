import { FETCHING, ARTICLES_FETCHED } from '../actions/types'

const INITIAL_STATE = { fetching: false, articles: [] }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCHING:
            return { ...state, fetching: true }
        case ARTICLES_FETCHED: {
            return { ...state, fetching: false, articles: action.payload }
        }
        default: return state
    }
}
