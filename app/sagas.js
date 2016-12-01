import constants from './constants';
import actions from './actions';
import { call, put, fork, take, select, cancel } from 'redux-saga/effects';
import mapKeys from 'lodash/mapKeys';
import snakeCase from 'lodash/snakeCase';
import camelCase from 'lodash/camelCase';
import set from 'lodash/set';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import unset from 'lodash/unset';
import api from './api';
import { SubmissionError } from 'redux-form';

export const getFormInit = state => state[constants.MOUNT_POINT].formReducer.formInit;

export function prepareParams(values) {
  const params = {};
  forEach(values, (v, k) => {
    set(params, k.split('/').map(f => snakeCase(f)).join('.'), v);
  });
  if (get(params, 'contract.move_in') === 'yes') {
    unset(params, 'old_contract');
  } else {
    unset(params, 'contract.beginning');
  }
  return params;
}

export function* calculate({ apiUrl, apiPath, token }) {
  while (true) {
    const { payload: { values, resolve, reject } } = yield take(constants.CALCULATE);
    yield put(actions.loading());
    try {
      const response = yield call(api.calculateOnServer, { token, apiUrl, apiPath, values: mapKeys(values, (v, k) => snakeCase(k)) });
      if (response._error) {
        yield call(reject, new SubmissionError(response));
      } else {
        const initObj = mapKeys(response.data.attributes, (v, k) => camelCase(k));
        initObj['meter/meteringType'] = values.meteringType;
        initObj['contract/yearlyKilowattHour'] = values.yearlyKilowattHour;
        initObj['address/zip'] = values.zip;
        yield put(actions.calculated(initObj));
      }
    } catch (error) {
      console.log(error);
    } finally {
      yield put(actions.loaded());
    }
  }
}

// use it instead of redux-json-api, because can't identify 'me' in users array
export function* loadProfile({ apiUrl, apiPath, token }) {
  yield put(actions.loading());
  try {
    const profile = yield call(api.getProfile, { token, apiUrl, apiPath });
    yield put(actions.profileLoaded(mapKeys(profile, (v, k) => `profile/${k}`)));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(actions.loaded());
  }
}

export function* handleMainForm({ apiUrl, apiPath, token }) {
  while (true) {
    const { payload: { values, resolve, reject } } = yield take(constants.SUBMIT_FORM);
    yield put(actions.loading());
    try {
      const res = yield call(api.createEntity, { apiUrl, apiPath, token, attributes: prepareParams(values) });

      if (res._error) {
        yield call(reject, new SubmissionError(res));
      } else {
        yield put(actions.success());
      }
    } catch (error) {
      console.log(error);
    } finally {
      yield put(actions.loaded());
    }
  }
}

export default function* powerFormSaga() {
  while (true) {
    const { apiUrl, apiPath, token } = yield take(constants.START_FORM);

    const calcLoop = yield fork(calculate, { apiUrl, apiPath, token });
    yield call(loadProfile, { apiUrl, apiPath, token });
    const formLoop = yield fork(handleMainForm, { apiUrl, apiPath, token });

    yield take(constants.CLEAN_STATE);
    yield cancel(calcLoop);
    yield cancel(formLoop);
    yield put(actions.cleanState());
  }
}
