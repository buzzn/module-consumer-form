import React from 'react';

export default ({ input, label, disabled, meta: { touched, error } }) => {
  const hasError = touched && error && !disabled;
  const formGroupClass = `form-group row${hasError ? ' has-danger' : ''}`;
  const formControlClass = `form-control${hasError ? ' form-control-danger' : ''}`;
  return (<div className={formGroupClass}>
    <label className="col-sm-4 col-xs-12 col-form-label">{label}</label>
    <div className="col-sm-8 col-xs-12">
      <textarea {...input} className={formControlClass} disabled={disabled} />
      {hasError && <div className="form-control-feedback">{error}</div>}
    </div>
  </div>);
};
