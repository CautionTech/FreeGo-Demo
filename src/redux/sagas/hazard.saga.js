import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* addHazard(action) {
  try {
    if (!action.payload.id) {
      yield axios.post('/api/hazard', action.payload);

      yield put({
        type: "FETCH_HAZARD",
      });
    }
    else {
      yield axios.put(`/api/hazard/${action.payload.id}`, action.payload);

      yield put({
        type: "FETCH_HAZARD",
      });
    }
  }
  catch (error) {
    console.log('add/put hazard request failed', error);
  }
}

function* fetchHazardToEdit(action) {
  try {
    let response = yield axios.get(`/api/hazard/edit/${action.payload}`);

    yield put({
      type: 'SET_HAZARD_TO_EDIT',
      payload: response.data
    });
  } 
  catch (error) {
    console.log('fetch hazard to edit failed', error);
  }
}

function* fetchUserHazard(action) {
  try {
    let response = yield axios.get(`/api/hazard/user/${action.payload}`);

    yield put({
      type: 'SET_USER_HAZARD',
      payload: response.data
    });
  } 
  catch (error) {
    console.log('fetch hazard to edit failed', error);
  }
}

function* fetchHazardCardDetails (action) {
  try {
    const response = yield axios.get(`/api/hazard/details/${action.payload}`)

    yield put(
      {type:'SET_HAZARD_CARD_DETAIL', 
      payload: response.data 
    });
    
  } catch (error) {
    console.log('fetch flagged hazards failed', error);
  }
}

function* addFlaggedHazard (action) {
  try {
    yield axios.post('/api/hazard/flagged', action.payload)

    yield put({
      type:'FETCH_HAZARD'
    });
    
  } catch (error) {
    console.log('add flagged hazard request failed', error);
  }
}

function* fetchFlaggedHazards (action) {
  try {
    const response = yield axios.get('/api/hazard/flagged', action.payload);

    yield put({
      type:'SET_FLAGGED_HAZARDS',
      payload: response.data
    });
    
  } catch (error) {
    console.log('fetch flagged hazard request failed', error);
  }
}

function* deleteFlag(action) {
  try {
    yield axios.delete(`/api/hazard/flagged/${action.payload}`);

    yield put({
      type: "FETCH_HAZARD",
    });
    yield put({
      type: "FETCH_USER_HAZARD",
    }); 
    yield put({
      type: "FETCH_FLAGGED_HAZARDS",
    });
  } catch (error) {
    console.log("delete flag error is", error);
  }
}

function* hazardSaga() {
  yield takeLatest('ADD_EDIT_HAZARD', addHazard);
  yield takeLatest('FETCH_HAZARD_TO_EDIT', fetchHazardToEdit);
  yield takeLatest ('FETCH_HAZARD_CARD_DETAIL', fetchHazardCardDetails);
  yield takeLatest('FETCH_USER_HAZARD', fetchUserHazard);
  yield takeLatest('ADD_FLAGGED_HAZARD', addFlaggedHazard);
  yield takeLatest('FETCH_FLAGGED_HAZARDS', fetchFlaggedHazards); 
  yield takeLatest('DELETE_FLAG', deleteFlag);
}

export default hazardSaga;