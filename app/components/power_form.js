import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import InputField from './input_field';
import SelectField from './select_field';
import DateField from './date_field';
import TextAreaField from './text_area_field';
import CheckboxField from './checkbox_field';
import constants from '../constants';
import actions from '../actions';
import { validateRequired } from './validation';

class PowerForm extends Component {
  static defaultProps = {
    titles: [
      {
        value: 'Dr.',
        title: 'Dr.',
      },
      {
        value: 'Dr. habil.',
        title: 'Dr. habil.',
      },
      {
        value: 'Prof.',
        title: 'Prof.',
      },
    ],
    gender: [
      {
        value: 'male',
        title: 'Männlich',
      },
      {
        value: 'female',
        title: 'Weiblich',
      },
      {
        value: 'noInformation',
        title: 'Keine Angabe',
      },
    ],
    legalEntity: [
      {
        value: 'natural_person',
        title: 'Ich selbst als natürliche Person (auch als Selbständiger, Freiberufler)',
      },
      {
        value: 'company',
        title: 'Eine Organisation (Firma, Genossenschaft, Verein oder auch Eheleute, Familie, WEG etc.)',
      },
    ],
    cateringPermit: [
      {
        value: 'yes',
        title: 'Ja',
      },
      {
        value: 'no',
        title: 'Nein',
      },
      {
        value: 'unknown',
        title: 'Weiß nicht',
      },
    ],
    reseller: [
      {
        value: 'yes',
        title: 'Ja',
      },
      {
        value: 'no',
        title: 'Nein',
      },
      {
        value: 'unknown',
        title: 'Weiß nicht',
      },
    ],
    contractorAddress: [
      {
        value: 'same',
        title: 'Selbe Adresse wie Vertragspartner (siehe oben)',
      },
      {
        value: 'other',
        title: 'Andere Adresse',
      },
    ],
    virtualCounter: [
      {
        value: 'yes',
        title: 'Ja',
      },
      {
        value: 'no',
        title: 'Nein',
      },
      {
        value: 'unknown',
        title: 'Weiß nicht',
      },
    ],
    moveIn: [
      {
        value: 'yes',
        title: 'Ja',
      },
      {
        value: 'no',
        title: 'Nein',
      },
    ],
    newMeterOperator: [
      {
        value: 'yes',
        title: 'Ja',
      },
      {
        value: 'no',
        title: 'Nein',
      },
      {
        value: 'unknown',
        title: 'Weiß nicht',
      },
    ],
    states: [
      {
        value: 'Baden-Würrtemberg',
        title: 'Baden-Würrtemberg',
      },
      {
        value: 'Bayern',
        title: 'Bayern',
      },
      {
        value: 'Berlin',
        title: 'Berlin',
      },
      {
        value: 'Brandenburg',
        title: 'Brandenburg',
      },
      {
        value: 'Bremen',
        title: 'Bremen',
      },
      {
        value: 'Hamburg',
        title: 'Hamburg',
      },
      {
        value: 'Hessen',
        title: 'Hessen',
      },
      {
        value: 'Niedersachsen',
        title: 'Niedersachsen',
      },
      {
        value: 'Nordrhein-Westfalen',
        title: 'Nordrhein-Westfalen',
      },
      {
        value: 'Mecklemburg-Vorpommern',
        title: 'Mecklemburg-Vorpommern',
      },
      {
        value: 'Rheinland-Pfalz',
        title: 'Rheinland-Pfalz',
      },
      {
        value: 'Saarland',
        title: 'Saarland',
      },
      {
        value: 'Sachsen',
        title: 'Sachsen',
      },
      {
        value: 'Sachsen-Anhalt',
        title: 'Sachsen-Anhalt',
      },
      {
        value: 'Schleswig-Holstein',
        title: 'Schleswig-Holstein',
      },
      {
        value: 'Thüringen',
        title: 'Thüringen',
      },
    ],
  }

  renderError({ disabled, meta: { touched, error } }) {
    return touched && error && !disabled ? <div className="error">{error}</div> : false;
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      valid,
      formValues,
      states,
      gender,
      titles,
      legalEntity,
      cateringPermit,
      reseller,
      contractorAddress,
      virtualCounter,
      moveIn,
      newMeterOperator,
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h6>Prices</h6>
          <Field name="energypriceCentsPerKilowattHour" type="text" label="Dein Arbeitspreis [Ct/kWh]" component={InputField} disabled="true" />
          <Field name="basepriceCentsPerMonth" type="text" label="Dein Grundpreis [€/Monat]" component={InputField} disabled="true" />
          <Field name="totalCentsPerMonth" type="text" label="Dein voraussichtlicher Abschlag [€/Monat]" component={InputField} disabled="true" />
          Alle Preisangaben inkl. aller gesetzlichen Abgaben, Steuern und Umlagen.
          <h6>Ansprechpartner</h6>
          <Field
            name="profile/title"
            label="Titel"
            component={SelectField}
            options={titles}
            defaultOption={{
              value: '',
              title: '',
            }} />
          <Field name="profile/firstName" type="text" label="Vorname" component={InputField} />
          <Field name="profile/lastName" type="text" label="Nachname" component={InputField} />
          <div className="row">
            <label className="col-sm-4 col-xs-12 col-form-label">Geschlecht</label>
            <div className="col-sm-8 col-xs-12">
              <Field name="profile/gender" component={::this.renderError}/>
              {gender.map(d => (
                <label key={d.value} className="custom-control custom-radio">
                  <Field className="custom-control-input" name="profile/gender" component="input" type="radio" value={d.value}/>
                  <span className="custom-control-indicator"></span>
                  <span className="custom-control-description">{d.title}</span>
                </label>
                ))}
            </div>
          </div>
          <Field name="profile/phone" type="text" label="Telefon" component={InputField} />
          <h6>Vertragspartner</h6>
          <div className="row">
            <label className="col-sm-4 col-xs-12 col-form-label">Wer soll Vertragspartner werden?</label>
            <div className="col-sm-8 col-xs-12">
              <Field name="contractingParty/legalEntity" component={::this.renderError}/>
              <div className="custom-controls-stacked">
                {legalEntity.map(d => (
                  <label key={d.value} className="custom-control custom-radio">
                    <Field className="custom-control-input" name="contractingParty/legalEntity" component="input" type="radio" value={d.value}/>
                    <span className="custom-control-indicator"></span>
                    <span className="custom-control-description">{d.title}</span>
                  </label>
                  ))}
              </div>
            </div>
          </div>
          <ReactCSSTransitionGroup
            transitionName="form-slide"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {formValues['contractingParty/legalEntity'] === 'company' ?
              <div>
                <Field name="company/organization/name" type="text" label="Name der Organisation" component={InputField} />
                <Field name="company/organization/representedBy" type="text" label="Vertreten durch" component={InputField} />
                <Field name="company/organization/email" type="text" label="E-Mail (zentrales Postfach)" component={InputField} />
                <Field
                  name="company/authorization"
                  title="Berechtigung"
                  label="Ich bin Ansprechpartner und berechtigt, für oben genannte Organisation Stromlieferverträge abzuschließen."
                  type="checkbox"
                  component={CheckboxField} />
              </div> :
              false}
          </ReactCSSTransitionGroup>
          <Field name="address/streetName" type="text" label="Straße (Vertragspartner)" component={InputField} />
          <Field name="address/streetNumber" type="text" label="Hausnummer (Vertragspartner)" component={InputField} />
          <Field name="address/address" type="text" label="Adresszusatz (Vertragspartner)" component={InputField} />
          <Field name="address/zip" type="text" label="PLZ (Vertragspartner)" component={InputField} disabled="true" />
          <Field name="address/city" type="text" label="Ort (Vertragspartner)" component={InputField} />
          <Field
            name="address/state"
            label="Bundesland (Vertragspartner)"
            component={SelectField}
            options={states}
            defaultOption={{
              value: '',
              title: '',
            }} />
          <ReactCSSTransitionGroup
            transitionName="form-slide"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {formValues['contractingParty/legalEntity'] === 'company' ?
              <div>
                <div className="row">
                  <label className="col-sm-4 col-xs-12 col-form-label">Besitzt Du/Ihr eine Versorgererlaubnis?</label>
                  <div className="col-sm-8 col-xs-12">
                    <Field name="contractingParty/providerPermission" component={::this.renderError}/>
                    {cateringPermit.map(d => (
                      <label key={d.value} className="custom-control custom-radio">
                        <Field className="custom-control-input" name="contractingParty/providerPermission" component="input" type="radio" value={d.value}/>
                        <span className="custom-control-indicator"></span>
                        <span className="custom-control-description">{d.title}</span>
                      </label>
                      ))}
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-4 col-xs-12 col-form-label">Bist Du/seid Ihr Wiederverkäufer?</label>
                  <div className="col-sm-8 col-xs-12">
                    <Field name="company/organization/retailer" component={::this.renderError}/>
                    {reseller.map(d => (
                      <label key={d.value} className="custom-control custom-radio">
                        <Field className="custom-control-input" name="company/organization/retailer" component="input" type="radio" value={d.value}/>
                        <span className="custom-control-indicator"></span>
                        <span className="custom-control-description">{d.title}</span>
                      </label>
                      ))}
                  </div>
                </div>
              </div> :
              false}
          </ReactCSSTransitionGroup>
          <Field
            label="Ich/wir habe(n) bereits einen Stromliefervertrag mit buzzn"
            name="contract/otherContract"
            component={CheckboxField}
            type="checkbox" />
          <h6>Bezugsstelle</h6>
          <div className="row">
            <label className="col-sm-4 col-xs-12 col-form-label">Wo willst Du buzzn Strom beziehen?</label>
            <div className="col-sm-8 col-xs-12">
              <Field name="#contractorAddress" component={::this.renderError}/>
              <div className="custom-controls-stacked">
                {contractorAddress.map(d => (
                  <label key={d.value} className="custom-control custom-radio">
                    <Field className="custom-control-input" name="#contractorAddress" component="input" type="radio" value={d.value}/>
                    <span className="custom-control-indicator"></span>
                    <span className="custom-control-description">{d.title}</span>
                  </label>
                  ))}
              </div>
            </div>
          </div>
          <ReactCSSTransitionGroup
            transitionName="form-slide"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {formValues['#contractorAddress'] === 'other' ?
              <div>
                <Field name="otherAddress/streetName" type="text" label="Straße (Bezugsstelle)" component={InputField} />
                <Field name="otherAddress/streetNumber" type="text" label="Hausnummer (Bezugsstelle)" component={InputField} />
                <Field name="otherAddress/address" type="text" label="Adresszusatz (Bezugsstelle)" component={InputField} />
                <Field name="otherAddress/zip" type="text" label="PLZ (Bezugsstelle)" component={InputField} />
                <Field name="otherAddress/city" type="text" label="Ort (Bezugsstelle)" component={InputField} />
                <Field
                  name="otherAddress/state"
                  label="Bundesland (Bezugsstelle)"
                  component={SelectField}
                  options={states}
                  defaultOption={{
                    value: '',
                    title: '',
                  }} />
              </div> :
              false}
          </ReactCSSTransitionGroup>
          <Field name="meter/manufacturerProductSerialnumber" type="text" label="Zählernummer" component={InputField} />
          <Field name="meter/manufacturerProductName" type="text" label="Zählpunktbezeichnung" component={InputField} />
          <Field name="#meteringPoint/countingPoint" type="text" label="Counting point:" component={InputField} />
          <Field name="meter/meteringType" type="text" label="Zählertyp" component={InputField} disabled="true" />
          <div className="row">
            <label className="col-sm-4 col-xs-12 col-form-label">Ist der Zähler virtuell?</label>
            <div className="col-sm-8 col-xs-12">
              <Field name="#meteringPoint/virtual" component={::this.renderError}/>
              {virtualCounter.map(d => (
                <label key={d.value} className="custom-control custom-radio">
                  <Field className="custom-control-input" name="#meteringPoint/virtual" component="input" type="radio" value={d.value}/>
                  <span className="custom-control-indicator"></span>
                  <span className="custom-control-description">{d.title}</span>
                </label>
                ))}
            </div>
          </div>
          <div className="row">
            <label className="col-sm-4 col-xs-12 col-form-label">Ziehst Du dort neu ein?</label>
            <div className="col-sm-8 col-xs-12">
              <Field name="contract/moveIn" component={::this.renderError}/>
              {moveIn.map(d => (
                <label key={d.value} className="custom-control custom-radio">
                  <Field className="custom-control-input" name="contract/moveIn" component="input" type="radio" value={d.value}/>
                  <span className="custom-control-indicator"></span>
                  <span className="custom-control-description">{d.title}</span>
                </label>
                ))}
            </div>
          </div>
          <ReactCSSTransitionGroup
            transitionName="form-slide"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {formValues['contract/moveIn'] === 'yes' ?
              <div>
                <Field name="contract/beginning" label="Tag der Erstbelieferung" component={DateField} />
              </div> :
              <div>
                <Field name="oldContract/oldElectricitySupplierName" type="text" label="Von welchem Anbieter kam bisher der Strom?" component={InputField} />
                <Field name="oldContract/customerNumber" type="text" label="Wie lautet Deine Kundennummer beim bisherigen Lieferanten?" component={InputField} />
                <Field name="oldContract/contractNumber" type="text" label="Wie lautet Deine Vertragskontonummer beim bisherigen Lieferanten?" component={InputField} />
              </div>}
          </ReactCSSTransitionGroup>
          <Field name="contract/yearlyKilowattHour" type="text" label="Verbrauchsprognose" component={InputField} disabled="true" />
          <div className="row">
            <label className="col-sm-4 col-xs-12 col-form-label">Hast Du für die Bezugsstelle einen neuen Messstellenbetreiber beauftragt?</label>
            <div className="col-sm-8 col-xs-12">
              <Field name="#newMeterOperator" component={::this.renderError}/>
              {newMeterOperator.map(d => (
                <label key={d.value} className="custom-control custom-radio">
                  <Field className="custom-control-input" name="#newMeterOperator" component="input" type="radio" value={d.value}/>
                  <span className="custom-control-indicator"></span>
                  <span className="custom-control-description">{d.title}</span>
                </label>
                ))}
            </div>
          </div>
          <ReactCSSTransitionGroup
            transitionName="form-slide"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {formValues['#newMeterOperator'] === 'yes' ?
              <Field name="contract/meteringPointOperatorName" type="text" label="Name des Messstellenbetreibers" component={InputField} /> :
              false}
          <Field name="bankAccount/holder" type="text" label="Kontoinhaber" component={InputField} />
          <Field name="bankAccount/iban" type="text" label="IBAN" component={InputField} />
          <Field
            title="SEPA Lastschrift-Mandat"
            label="Ich erlaube buzzn widerruflich, Zahlungen von oben stehendem Konto mittels SEPA-Basislastschrift einzuziehen. Zugleich weise ich meine Bank an, die von buzzn von meinem Konto gezogenen Lastschriften einzulösen. Ich kann innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, die Erstattung des belasteten Betrages verlangen. Es gelten dabei die mit meiner Bank vereinbarten Bedingungen."
            name="bankAccount/directDebit"
            component={CheckboxField}
            type="checkbox" />
          <Field
            title="Vollmacht"
            label="Hiermit erteile ich buzzn Vollmacht"
            name="contract/powerOfAttorney"
            component={CheckboxField}
            type="checkbox" />
          <Field
            title="Allgemeine Geschäftsbedingungen (AGB)"
            label="Ja, ich habe die AGB erhalten und bin mit ihnen einverstanden"
            name="contract/terms"
            component={CheckboxField}
            type="checkbox" />
          <h6>Feedback</h6>
          <Field name="contract/messageToBuzzn" label="Meine Nachricht an das buzzn Team:" component={TextAreaField} />
          <Field name="contract/hearAboutBuzzn" label="Wie bist Du auf buzzn aufmerksam geworden?" component={TextAreaField} />
          </ReactCSSTransitionGroup>
          <button
            disabled={ submitting || !valid }
            action="submit"
            className="btn btn-outline-primary">Submit</button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const baseFields = [
    'firstName', 'lastName', 'gender', 'phone', 'legalEntity',
    'street', 'houseNumber', 'zip', 'state', 'contractorAddress', 'counterNumber',
    'countingPoint', 'virtualCounter', 'moveIn', 'consumptionForecast',
    'accountHolder', 'iban', 'sepa',
  ];

  const organizationFields = [
    'organizationName', 'representedBy', 'organizationEmail', 'organizationAuthorization',
    'cateringPermit', 'reseller',
  ];

  const addressFields = [
    'otherStreet', 'otherHouseNumber', 'otherZip', 'otherState',
  ];

  const firstContractFields = [
    'startDate', 'previousCustomerNumber', 'previousAccountNumber',
  ];

  return Object.assign({},
    validateRequired({ values, fields: baseFields }),
    values.legalEntity === 'company' && validateRequired({ values, fields: organizationFields }),
    values.contractorAddress === 'other' && validateRequired({ values, fields: addressFields }),
    values.firstContract === 'yes' && validateRequired({ values, fields: firstContractFields })
  );
}

function getFormState(reducerTree) {
  return reducerTree[constants.MOUNT_POINT].form;
}

const PowerFormWrapped = reduxForm({
  form: 'PowerForm',
  // validate,
  onSubmit(values, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(actions.submitForm({ values, resolve, reject }));
    });
  },
  getFormState,
})(PowerForm);

const selector = formValueSelector('PowerForm', getFormState);

function mapStateToProps(state) {
  return {
    formValues: selector(state, 'contractingParty/legalEntity', '#contractorAddress', 'contract/moveIn', 'startDate', '#newMeterOperator'),
    initialValues: state[constants.MOUNT_POINT].formReducer.formInit,
  };
}

export default connect(mapStateToProps)(PowerFormWrapped);
