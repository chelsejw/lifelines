import appealsReducer from '../../app/appeals/reducers'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    appeals: appealsReducer
})

export default allReducers