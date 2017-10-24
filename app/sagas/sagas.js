
import { call, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { LOGIN, SIGNUP, GET_EVENTS, GET_CATEGORIES, GET_TAGS, CREATE_EVENT } from "../actions/";
import { loginRequest, signupRequest, getEventsRequest, getCategoriesRequest, getTagsRequest, saveEventRequest } from "../api/"

const getToken = state => state.reducers.user.auth_token;

const login = function* (action){
  try {
    yield put({ type: LOGIN.LOADING })

    const user_login = action.payload

    const response = yield call(loginRequest, user_login)

    yield put({ type: LOGIN.SUCCESS, response })
  } catch (error) {
    console.log(error);
    yield put({ type: LOGIN.ERROR, error })
  }
};

const signup = function* (action){
  try {
    yield put({ type: SIGNUP.LOADING })

    const user_signup = action.payload;

    const response = yield call(signupRequest, user_signup)

    yield put({ type: SIGNUP.SUCCESS, response })
  } catch (error) {
    console.log(error);
    yield put({ type: SIGNUP.ERROR, error })
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
    yield put({ type: GET_CATEGORIES.LOADING })

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
    yield put({ type: GET_TAGS.LOADING })

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
export const root = function* () {
  yield takeLatest(LOGIN.SELF, login)
  yield takeLatest(SIGNUP.SELF, signup)
  yield takeLatest(GET_EVENTS.SELF, getEvents)
  yield takeLatest(GET_CATEGORIES.SELF, getCategories)
  yield takeLatest(GET_TAGS.SELF, getTags)
  yield takeLatest(CREATE_EVENT.SELF, saveEvent)
  // yield takeEvery(DECREMENT_COUNTER.SELF, counterDec)
  // yield takeEvery(INCREMENT_COUNTER.SELF, counterInc)
};