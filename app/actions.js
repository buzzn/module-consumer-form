import constants from './constants';

export default {
  calculate: (payload) => ({ type: constants.CALCULATE, payload }),
  calculated: (results) => ({ type: constants.CALCULATED, results }),
  profileLoaded: (profile) => ({ type: constants.PROFILE_LOADED, profile }),
  loading: () => ({ type: constants.LOADING }),
  loaded: () => ({ type: constants.LOADED }),
  preloadData: () => ({ type: constants.PRELOAD_DATA }),
  cleanState: () => ({ type: constants.CLEAN_STATE }),
  submitForm: (payload) => ({ type: constants.SUBMIT_FORM, payload }),
  startForm: (apiParams) => ({ type: constants.START_FORM, ...apiParams }),
  success: () => ({ type: constants.SUCCESS }),
};
