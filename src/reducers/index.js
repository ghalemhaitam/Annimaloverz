import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import RegisterReducer from './RegisterReducer'
import ProfileReducer from "./ProfileReducer"
import ArticleReducer from './ArticleReducer'
import ChatReducer from './ChatReducer'

export default combineReducers({
    auth: AuthReducer,
    register: RegisterReducer,
    profile: ProfileReducer,
    article: ArticleReducer,
    chat: ChatReducer
})
