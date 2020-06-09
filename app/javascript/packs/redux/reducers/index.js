import {items, itemsHasErrored, itemsIsLoading} from './appeals'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    items,
    itemsHasErrored,
    itemsIsLoading
})

export default allReducers