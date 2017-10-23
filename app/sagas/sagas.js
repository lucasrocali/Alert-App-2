import { call, takeEvery, takeLatest, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { LOGIN } from "../actions/";

const production = true;

var API = 'https://rocali-alert-api.herokuapp.com/';
var APIToken = "XNZwCzSf5Wxt-caQkxyQ"

if (!production) {
  API = 'http://192.168.1.35:3000';
  APIToken = "Me4brAzf2yzxzhHTtDs2"
}

function loginRequest(email, password) {
  console.log("loginRequest");
  console.log(email);
  console.log(password);
  return fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/alert.v1+json',
      'Content-Type': 'application/json',
      'ApiToken': APIToken
    },
    body: JSON.stringify({
      email: email.toLowerCase(),
      password: password,
    })})
    .then(response => response.json())
    .then(data => data)
    .catch((error) => { throw error });
}

// const counterInc = function* (){
// 	console.log('counterInc');
//   yield put({ type: INCREMENT_COUNTER.START });
//   yield delay(500);
//   yield put({ type: INCREMENT_COUNTER.FINISH });
// };

// const counterDec = function* (){
// 	console.log('counterDec');
//   yield put({ type: DECREMENT_COUNTER.START });
//   yield delay(500);
//   yield put({ type: DECREMENT_COUNTER.FINISH });
// };

const login = function* (action){
  try {
    yield put({ type: LOGIN.LOADING })
    const { email, password } = action

    const response = yield call(loginRequest, email, password)

    yield put({ type: LOGIN.SUCCESS, response })
  } catch (error) {
    console.log(error);
    yield put({ type: LOGIN.ERROR, error })
  }
};

export const root = function* () {
  yield takeLatest(LOGIN.SELF, login)
  // yield takeEvery(DECREMENT_COUNTER.SELF, counterDec)
  // yield takeEvery(INCREMENT_COUNTER.SELF, counterInc)
};