import React from 'react';

export default ({ input, label, title, disabled, meta: { touched, error } }) => {
  const hasError = touched && error && !disabled;
  const formGroupClass = `form-group row${hasError ? ' has-danger' : ''}`;
  return (<div className={formGroupClass}>
    <label className="col-sm-4 col-xs-12 col-form-label">{title}</label>
    <div className="col-sm-8 col-xs-12">
      <label className="custom-control custom-checkbox">
        <input className="custom-control-input" type="checkbox" disabled={disabled} {...input} />
        <span className="custom-control-indicator"></span>
        <span className="custom-control-description">{label}</span>
      </label>
      {hasError && <div className="form-control-feedback">{error}</div>}
    </div>
  </div>);
};
