import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PowerFormPreCheck from './power_form_pre_check';
import PowerForm from './power_form';
import constants from '../constants';

const PowerFormContainer = (props) => {
  const { formInit, success } = props.formReducer;
  const { token } = props.auth;

  if (!token) return (<div></div>);

  if (success) {
    return (
      <div className="alert alert-success" role="alert">
        <strong>
          <FormattedMessage
            id="powertakerForm.complete"
            description="Form success message"
            defaultMessage="Form complete" />
        </strong>
      </div>
    );
  }

  return (
    <div>
    {(!formInit.energypriceCentsPerKilowattHour) ?
      <PowerFormPreCheck /> :
      <PowerForm />
    }
    </div>);
};

function mapStateToProps(state) {
  return {
    formReducer: state[constants.MOUNT_POINT].formReducer,
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(PowerFormContainer);
