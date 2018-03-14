import {combineReducers} from 'redux'
import * as consts from '../consts'


const venues = (state = [], {type, payload}) => {
	switch(type){
		case consts.SEARCH_PLACES_API_SUCCESS:
			return payload.venues
		default:
			return state
	}
}

const placeDetails = (state = {}, {type, payload}) => {
	switch(type){
		case consts.PLACE_DETAILS_API_SUCCESS:
			return payload.venue
		default:
			return state
	}
}

const recentSearches = (state = [], {type, payload}) => {
	switch(type){
		case consts.SEARCH_PLACES_API_REQUEST:
			return [
				{
					query: payload.query,
				 	near: payload.near
				},
				...state
			].slice(0,14)
		default:
			return state
	}
}

const loading = (state = false, {type, payload}) => {
	switch(type){
		case consts.SEARCH_PLACES_API_REQUEST:
		case consts.PLACE_DETAILS_API_REQUEST:
			return true;

		case consts.SEARCH_PLACES_API_SUCCESS:
		case consts.PLACE_DETAILS_API_SUCCESS:
		case consts.ERROR:
			return false

		default:
			return state
	}
}



export default combineReducers({
	venues,
	placeDetails,
	recentSearches,
	loading
})
