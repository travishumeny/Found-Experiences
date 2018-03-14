import * as consts from "../consts";

export function fetchAllPlaces(payload) {
  return {
    type: consts.SEARCH_PLACES_API_REQUEST,
    payload
  }
}

export function handleAllPlaces(payload) {
  return {
    type: consts.SEARCH_PLACES_API_SUCCESS,
    payload
  }
}

export function fetchPlaceDetails(payload) {
  return {
    type: consts.PLACE_DETAILS_API_REQUEST,
    payload
  }
}

export function handlePlaceDetails(payload) {
  return {
    type: consts.PLACE_DETAILS_API_SUCCESS,
    payload
  }
}

export function handleError(error) {
  return {
    type: consts.ERROR,
    error
  }
}

export function addSavedPlace(place) {
    return {
        type: consts.ADD_PLACE_CLICK,
        data: place
    };
}

export function removeSavedPlace(id) {
    return {
        type: consts.REMOVE_PLACE_CLICK,
        id
    };
}

export function updateSavedPlace(id, updates) {
    return {
        type: consts.UPDATE_PLACE_CLICK,
        updates,
        id
    };
}
