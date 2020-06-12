import appealsReducer from '../../app/appeals/reducers'
import appealFormReducer from '../../app/forms/AppealForm/reducers'
import authReducer from '../../app/auth/reducer'
import chatReducer from '../../app/chat/reducers'

import {combineReducers} from 'redux'

const allReducers = combineReducers({
    appeals: appealsReducer,
    appealForm: appealFormReducer,
    auth: authReducer,
    chat: chatReducer
})

export default allReducers