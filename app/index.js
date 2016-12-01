import { css } from 'glamor';
import reducers from './reducers';
import container from './components/power_form_container';
import constants from './constants';
import actions from './actions';
import sagas from './sagas';

// use glamor or add style copying to postinstall until fix for npm webpack build will be found
// import './styles/power_form.scss';
css.insert(`
  .form-slide-enter {
    opacity: 0.01;
  }

  .form-slide-enter.form-slide-enter-active {
    opacity: 1;
    transition: all 500ms ease-in;
  }

  .form-slide-leave {
    opacity: 1;
  }

  .form-slide-leave.form-slide-leave-active {
    opacity: 0.01;
    transition: all 300ms ease-out;
  }

  .form-slide-appear {
    opacity: 0.01;
  }

  .form-slide-appear.form-slide-appear-active {
    opacity: 1;
    transition: all 500ms ease-in;
  }

  .error {
    color: red;
  }
`);

export default {
  reducers,
  container,
  constants,
  actions,
  sagas,
};
