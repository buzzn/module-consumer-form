import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import constants from './constants';

function formInitReducer(state = {}, action) {
  switch (action.type) {
    case constants.CALCULATED:
      return { ...state, ...action.results };
    case constants.PROFILE_LOADED:
      return { ...state, ...action.profile };
    default:
      return state;
  }
}

function saveIdReducer(state = {}, action) {
  return { ...state, ...action.docId };
}

function formReducer(state = { loading: false, formInit: {} }, action) {
  switch (action.type) {
    case constants.CALCULATE:
      return { ...state, payload: action.payload };
    case constants.CALCULATED:
    case constants.PROFILE_LOADED:
      return { ...state, errors: null, formInit: formInitReducer(state.formInit, action) };
    case constants.LOADING:
      return { ...state, loading: true };
    case constants.LOADED:
      return { ...state, loading: false };
    case constants.SUBMIT_FORM:
      return { ...state, payload: action.payload };
    case constants.START_FORM:
      return { ...state, token: action.token, apiUrl: action.apiUrl, apiPath: action.apiPath };
    case constants.SUCCESS:
      return { ...state, success: true };
    case constants.CLEAN_STATE:
      return { loading: false, formInit: {}, payload: {} };
    case constants.PRELOAD_DATA:
    default:
      return state;
  }
}

const reducers = {
  formReducer,
  form,
};

export default combineReducers(reducers);
