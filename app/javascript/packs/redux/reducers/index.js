import appealsReducer from '../../app/appeals/reducers'
import appealFormReducer from '../../app/forms/AppealForm/reducers'
import authReducer from '../../app/auth/reducer'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    appeals: appealsReducer,
    appealForm: appealFormReducer,
    auth: authReducer
})

export default allReducers