
import { call, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { AUTHENTIFICATION, GET_EVENTS, GET_CATEGORIES, GET_TAGS, CREATE_EVENT, SET_STRENGTH } from "../actions/";
import { loginRequest, signupRequest, getEventsRequest, getCategoriesRequest, getTagsRequest, saveEventRequest, setStrengthRequest } from "../api/"
import * as selectors from '../reducers/reducers';

const getToken = state => state.reducers.authentication.auth_token;

const authenticate = function* (action){
  try {
    yield put({ type: AUTHENTIFICATION.LOADING })

    const user_credentials = action.payload

    if (user_credentials.login) {
      
      const response = yield call(loginRequest, user_credentials)

      yield put({ type: AUTHENTIFICATION.SUCCESS, response })
    } else {

      const response = yield call(signupRequest, user_credentials)

      yield put({ type: AUTHENTIFICATION.SUCCESS, response })
    }

    
  } catch (error) {
    console.log(error);
    yield put({ type: AUTHENTIFICATION.ERROR, error })
  }
};

const getEvents = function* (action){
  try {
    yield put({ type: GET_EVENTS.LOADING })

    const token = yield select(getToken)

    const response = yield call(getEventsRequest,token)

    yield put({ type: GET_EVENTS.SUCCESS, response })
  } catch (error) {
    console.log(error);
    yield put({ type: GET_EVENTS.ERROR, error })
  }
};

const getCategories = function* (action){
  try {

    const token = yield select(getToken)

    const response = yield call(getCategoriesRequest,token)

    yield put({ type: GET_CATEGORIES.SUCCESS, response })
  } catch (error) {
    console.log(error);
    yield put({ type: GET_CATEGORIES.ERROR, error })
  }
};

const getTags = function* (action){
  try {

    const token = yield select(getToken)

    const response = yield call(getTagsRequest,token)

    yield put({ type: GET_TAGS.SUCCESS, response })
  } catch (error) {
    console.log(error);
    yield put({ type: GET_TAGS.ERROR, error })
  }
};

const saveEvent = function* (action){
  try {
    yield put({ type: CREATE_EVENT.LOADING })

    const token = yield select(getToken)

    const event = action.payload

    const response = yield call(saveEventRequest,token,event)

    yield put({ type: CREATE_EVENT.SUCCESS, response })
  } catch (error) {
    console.log(error);
    yield put({ type: CREATE_EVENT.ERROR, error })
  }
};

const setStrength = function* (action){
  try {
    yield put({ type: SET_STRENGTH.LOADING })

    const token = yield select(getToken)

    const { event_id, up_down } = action.payload

    const response = yield call(setStrengthRequest,token,event_id,up_down)

    yield put({ type: SET_STRENGTH.SUCCESS, response })
  } catch (error) {
    console.log(error);
    yield put({ type: SET_STRENGTH.ERROR, error })
  }
};
export const root = function* () {
  yield takeLatest(AUTHENTIFICATION.SELF, authenticate)
  yield takeLatest(GET_EVENTS.SELF, getEvents)
  yield takeLatest(GET_CATEGORIES.SELF, getCategories)
  yield takeLatest(GET_TAGS.SELF, getTags)
  yield takeLatest(CREATE_EVENT.SELF, saveEvent)
  yield takeLatest(SET_STRENGTH.SELF, setStrength)
};