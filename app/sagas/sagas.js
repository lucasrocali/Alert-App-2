import { takeEvery, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {DECREMENT_COUNTER, INCREMENT_COUNTER} from "../actions/CounterActions";

const counterInc = function* (){
	console.log('counterInc');
  yield put({ type: INCREMENT_COUNTER.START });
  yield delay(500);
  yield put({ type: INCREMENT_COUNTER.FINISH });
};

const counterDec = function* (){
	console.log('counterDec');
  yield put({ type: DECREMENT_COUNTER.START });
  yield delay(500);
  yield put({ type: DECREMENT_COUNTER.FINISH });
};

export const root = function* () {
  yield takeEvery(DECREMENT_COUNTER.SELF, counterDec)
  yield takeEvery(INCREMENT_COUNTER.SELF, counterInc)
};