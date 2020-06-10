import appealsReducer from '../../app/appeals/reducers'
import appealFormReducer from '../../app/forms/reducers'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    appeals: appealsReducer,
    appealForm: appealFormReducer
})

export default allReducers