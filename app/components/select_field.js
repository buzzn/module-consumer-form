import React from 'react';

export default ({ input, label, disabled, defaultOption, options, meta: { touched, error } }) => (
  <div>
    <div className="form-group row">
      <label className="col-sm-4 col-xs-12 col-form-label">{label}</label>
      <div className="col-sm-8 col-xs-12">
        <select className="form-control" {...input}>
          <option value={defaultOption.value}>{defaultOption.title}</option>
          {options.map(o => <option key={o.value} value={o.value}>{o.title}</option>)}
        </select>
      </div>
    </div>
    {touched && error && !disabled && <div className="error">{error}</div>}
  </div>
);
