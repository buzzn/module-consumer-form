import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import InputField from './input_field';
import SelectField from './select_field';
import constants from '../constants';
import { validateRequired } from './validation';
import actions from '../actions';

const messages = defineMessages({
  typesDefault: {
    id: 'powertakerForm.pre.type.default',
    description: 'Default metering type in pre form',
    defaultMessage: 'Select meter',
  },
  typesSingleTariff: {
    id: 'powertakerForm.pre.type.singleTariff',
    description: 'Single tariff metering type in pre form',
    defaultMessage: 'Single tarif meter',
  },
  typesDoubleTariff: {
    id: 'powertakerForm.pre.type.doubleTariff',
    description: 'Double tariff metering type in pre form',
    defaultMessage: 'Double tarif meter',
  },
  typesSmart: {
    id: 'powertakerForm.pre.type.smart',
    description: 'Smart meter metering type in pre form',
    defaultMessage: 'Smart meter',
  },
  typesOther: {
    id: 'powertakerForm.pre.type.other',
    description: 'Other metering type in pre form',
    defaultMessage: 'Other meter',
  },
  typesUnknown: {
    id: 'powertakerForm.pre.type.unknown',
    description: 'Unknown metering type in pre form',
    defaultMessage: 'I dont know',
  },
});

const PowerFormPreCheck = injectIntl(({ handleSubmit, submitting, valid, intl }) => (
  <div>
    <form onSubmit={handleSubmit}>
      <label>
        <FormattedMessage
          id="powertakerForm.pre.zip"
          description="Location input label in pre form"
          defaultMessage="Where is your reference point?" />
      </label>
      <Field name="zip" type="text" component={InputField} />
      <label>
        <FormattedMessage
          id="powertakerForm.pre.kwh"
          description="Expected usage in pre form"
          defaultMessage="How much electricity will you consume?" />
      </label>
      <Field name="yearlyKilowattHour" type="text" component={InputField} />
      <label>
        <FormattedMessage
          id="powertakerForm.pre.type"
          description="Metering type in pre form"
          defaultMessage="What counter type do you have?" />
      </label>
      <Field
        name="meteringType"
        component={SelectField}
        options={[
          {
            value: 'single_tarif_meter',
            title: intl.formatMessage(messages.typesSingleTariff),
          },
          {
            value: 'double_tarif_meter',
            title: intl.formatMessage(messages.typesDoubleTariff),
          },
          {
            value: 'smartmeter',
            title: intl.formatMessage(messages.typesSmart),
          },
          {
            value: 'other',
            title: intl.formatMessage(messages.typesOther),
          },
          {
            value: 'dont_know',
            title: intl.formatMessage(messages.typesUnknown),
          },
        ]}
        defaultOption={{
          value: '',
          title: intl.formatMessage(messages.typesDefault),
        }} />
      <button
        disabled={ submitting || !valid }
        action="submit"
        className="btn btn-outline-primary">Calculate</button>
    </form>
  </div>
));

function validate(values) {
  return Object.assign({},
    validateRequired({ values, fields: ['zip', 'yearlyKilowattHour', 'meteringType'] }),
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
