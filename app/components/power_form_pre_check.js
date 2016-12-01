import React from 'react';
import { Field, reduxForm } from 'redux-form';
import InputField from './input_field';
import SelectField from './select_field';
import constants from '../constants';
import { validateRequired } from './validation';
import actions from '../actions';

const PowerFormPreCheck = props => {
  const { handleSubmit, submitting, valid } = props;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Wo liegt Deine Bezugsstelle?</label>
        <Field name="zip" type="text" component={InputField} />
        <label>Wieviel Strom wirst Du verbrauchen?</label>
        <Field name="yearlyKilowattHour" type="text" component={InputField} />
        <label>Welchen Zählertyp hast Du?</label>
        <Field
          name="meteringType"
          component={SelectField}
          options={[
            {
              value: 'single_tarif_meter',
              title: 'Single tarif meter',
            },
            {
              value: 'double_tarif_meter',
              title: 'Double tarif meter',
            },
            {
              value: 'smartmeter',
              title: 'Smart meter',
            },
            {
              value: 'other',
              title: 'Other meter',
            },
            {
              value: 'dont_know',
              title: 'I dont know',
            },
          ]}
          defaultOption={{
            value: '',
            title: 'Select meter',
          }} />
        <button
          disabled={ submitting || !valid }
          action="submit"
          className="btn btn-outline-primary">Calculate</button>
      </form>
    </div>
  );
};

function validate(values) {
  return Object.assign({},
    validateRequired({ values, fields: ['zip', 'kwh', 'tarifType'] })
  );
}

function getFormState(reducerTree) {
  return reducerTree[constants.MOUNT_POINT].form;
}

export default reduxForm({
  form: 'PowerFormPreCheck',
  validate,
  onSubmit(values, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(actions.calculate({ values, resolve, reject }));
    });
  },
  getFormState,
})(PowerFormPreCheck);
