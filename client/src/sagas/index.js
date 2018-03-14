import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import * as consts from '../consts'
import Api from '../api'
import { postPlace, deleteSavedPlace, putSavedPlace } from '../api';
import {handleAllPlaces, handlePlaceDetails, handleError} from '../actions'

function* handleServerResponse(place, success, failed, errorMsg, additional = {}) {
    if (place && place.name) {
        yield put(Object.assign({}, { type: success, place }, additional));
    } else {
        yield put({ type: failed, error: errorMsg });
    }
}

export function* addSavedPlace(action) {
    try {
        const place = yield call(postPlace, action.data);

        yield* handleServerResponse(
            place,
            consts.ADD_PLACE_SUCCESS,
            consts.ADD_PLACE_FAILED,
            'NETWORK ERROR: Place wasn\'t created'
        );
    } catch(e) {
        yield put({
            type: consts.ADD_PLACE_FAILED,
            error: e
        });
    }
}

function* watchAddPlace() {
    yield* takeEvery(consts.ADD_PLACE_CLICK, addSavedPlace);
}

export function* removeSavedPlace(action) {
    try {
        const place = yield call(deleteSavedPlace, action.id);

        yield* handleServerResponse(
            place,
            consts.REMOVE_PLACE_SUCCESS,
            consts.REMOVE_PLACE_FAILED,
            'NETWORK ERROR: Place wasn\'t deleted'
        );
    } catch(e) {
        yield put({
            type: consts.REMOVE_PLACE_FAILED,
            error: e
        });
    }
}

function* watchRemovePlace() {
    yield* takeEvery(consts.REMOVE_PLACE_CLICK, removeSavedPlace);
}

export function* updateSavedPlace(action) {
    try {
        const { id, updates } = action;
        const place = yield call(putSavedPlace, id, updates);

        yield* handleServerResponse(
            place,
            consts.UPDATE_PLACE_SUCCESS,
            consts.UPDATE_PLACE_FAILED,
            'NETWORK ERROR: Place status wasn\'t updated',
            { updates }
        );
    } catch(e) {
        yield put({
            type: consts.UPDATE_PLACE_FAILED,
            error: e
        });
    }
}

function* watchUpdatePlace() {
    yield* takeEvery(consts.UPDATE_PLACE_CLICK, updateSavedPlace);
}


function* fetchAllPlaces(action) {
  try {
      const venues = yield call(Api.fetchAllPlaces, action.payload);
      yield put(handleAllPlaces({venues}));
   } catch (e) {
      yield put(handleError({message: e.message}));
   }
}

function* fetchPlaceDetails(action) {
  try {
      const venue = yield call(Api.fetchPlaceDetails, action.payload);
      yield put(handlePlaceDetails({venue}));
   } catch (e) {
      yield put(handleError({message: e.message}));
   }
}

function* rootSaga() {
  yield takeLatest(consts.SEARCH_PLACES_API_REQUEST, fetchAllPlaces);
  yield takeLatest(consts.PLACE_DETAILS_API_REQUEST, fetchPlaceDetails);
  yield [
      watchAddPlace(),
      watchRemovePlace(),
      watchUpdatePlace()
  ];
}

export default rootSaga;
