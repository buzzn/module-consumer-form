import React from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import 'react-widgets/dist/css/react-widgets.css';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';

momentLocalizer(moment);

export default ({ input, label, value, disabled, meta: { touched, error } }) => {
  const hasError = touched && error && !disabled;
  const formGroupClass = `form-group row${hasError ? ' has-danger' : ''}`;
  const formControlClass = `form-control${hasError ? ' form-control-danger' : ''}`;
  return (<div className={formGroupClass}>
    <label className="col-sm-4 col-xs-12 col-form-label">{label}</label>
    <div className="col-sm-8 col-xs-12">
      <DateTimePicker {...input}
        className={formControlClass}
        disabled={disabled}
        time={false}
        format={'DD.MM.YYYY'}
        value={value}
        onBlur={() => input.onBlur(value)} />
      {hasError && <div className="form-control-feedback">{error}</div>}
    </div>
  </div>);
};
