import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import InputField from './input_field';
import SelectField from './select_field';
import DateField from './date_field';
import TextAreaField from './text_area_field';
import CheckboxField from './checkbox_field';
import constants from '../constants';
import actions from '../actions';
import { validateRequired } from './validation';

const messages = defineMessages({
  titlesDr: {
    id: 'powertakerForm.title.dr',
    description: 'Dr. title in form',
    defaultMessage: 'Dr.',
  },
  titlesDrHabil: {
    id: 'powertakerForm.title.drHabil',
    description: 'Dr. habil. title in form',
    defaultMessage: 'Dr. habil.',
  },
  titlesProf: {
    id: 'powertakerForm.title.prof',
    description: 'Prof. title in form',
    defaultMessage: 'Prof.',
  },
  genderMale: {
    id: 'powertakerForm.gender.male',
    description: 'Male gender in form',
    defaultMessage: 'Male',
  },
  genderFemale: {
    id: 'powertakerForm.gender.female',
    description: 'Female gender in form',
    defaultMessage: 'Female',
  },
  genderUnknown: {
    id: 'powertakerForm.gender.unknown',
    description: 'Unknown gender in form',
    defaultMessage: 'No information',
  },
  legalEntityPerson: {
    id: 'powertakerForm.legalEntity.person',
    description: 'Natural Person legal entity in form',
    defaultMessage: 'I myself as a natural person (also as a freelancer)',
  },
  legalEntityCompany: {
    id: 'powertakerForm.legalEntity.company',
    description: 'Company legal entity in form',
    defaultMessage: 'An organization (company, cooperative, association or even married people, family, WEG etc.)',
  },
  cateringPermitYes: {
    id: 'powertakerForm.cateringPermit.yes',
    description: 'Yes catering permit in form',
    defaultMessage: 'Yes',
  },
  cateringPermitNo: {
    id: 'powertakerForm.cateringPermit.no',
    description: 'No catering permit in form',
    defaultMessage: 'No',
  },
  cateringPermitUnknown: {
    id: 'powertakerForm.cateringPermit.unknown',
    description: 'Unknown catering permit in form',
    defaultMessage: `I don't know`,
  },
  resellerYes: {
    id: 'powertakerForm.reseller.yes',
    description: 'Yes reseller in form',
    defaultMessage: 'Yes',
  },
  resellerNo: {
    id: 'powertakerForm.reseller.no',
    description: 'No reseller in form',
    defaultMessage: 'No',
  },
  resellerUnknown: {
    id: 'powertakerForm.reseller.unknown',
    description: 'Unknown reseller in form',
    defaultMessage: `I don't know`,
  },
  contractorAddressSame: {
    id: 'powertakerForm.contractorAddress.same',
    description: 'Same contractor address in form',
    defaultMessage: 'Same address as contract partner (see above)',
  },
  contractorAddressOther: {
    id: 'powertakerForm.contractorAddress.other',
    description: 'Other contractor address in form',
    defaultMessage: 'Other address',
  },
  virtualCounterYes: {
    id: 'powertakerForm.virtualCounter.yes',
    description: 'Yes virtual counter in form',
    defaultMessage: 'Yes',
  },
  virtualCounterNo: {
    id: 'powertakerForm.virtualCounter.no',
    description: 'No virtual counter in form',
    defaultMessage: 'No',
  },
  virtualCounterUnknown: {
    id: 'powertakerForm.virtualCounter.unknown',
    description: 'Unknown virtual counter in form',
    defaultMessage: `I don't know`,
  },
  moveInYes: {
    id: 'powertakerForm.moveIn.yes',
    description: 'Yes move in in form',
    defaultMessage: 'Yes',
  },
  moveInNo: {
    id: 'powertakerForm.moveIn.no',
    description: 'No move in in form',
    defaultMessage: 'No',
  },
  newMeterOperatorYes: {
    id: 'powertakerForm.newMeterOperator.yes',
    description: 'Yes new meter operator in form',
    defaultMessage: 'Yes',
  },
  newMeterOperatorNo: {
    id: 'powertakerForm.newMeterOperator.no',
    description: 'No new meter operator in form',
    defaultMessage: 'No',
  },
  newMeterOperatorUnknown: {
    id: 'powertakerForm.newMeterOperator.unknown',
    description: 'Unknown new meter operator in form',
    defaultMessage: `I don't know`,
  },
  energypriceCentsPerKilowattHour: {
    id: 'powertakerForm.field.energypriceCentsPerKilowattHour',
    description: 'energypriceCentsPerKilowattHour field in form',
    defaultMessage: 'Your working rate [Ct / kWh]',
  },
  basepriceCentsPerMonth: {
    id: 'powertakerForm.field.basepriceCentsPerMonth',
    description: 'basepriceCentsPerMonth field in form',
    defaultMessage: 'Your basic price [€ / month]',
  },
  totalCentsPerMonth: {
    id: 'powertakerForm.field.totalCentsPerMonth',
    description: 'totalCentsPerMonth field in form',
    defaultMessage: 'Your estimated discount [€ / month]',
  },
  profileTitle: {
    id: 'powertakerForm.field.profileTitle',
    description: 'profileTitle field in form',
    defaultMessage: 'Title',
  },
  profileFirstName: {
    id: 'powertakerForm.field.profileFirstName',
    description: 'profileFirstName field in form',
    defaultMessage: 'First name',
  },
  profileLastName: {
    id: 'powertakerForm.field.profileLastName',
    description: 'profileLastName field in form',
    defaultMessage: 'Last name',
  },
  profilePhone: {
    id: 'powertakerForm.field.profilePhone',
    description: 'profilePhone field in form',
    defaultMessage: 'Phone',
  },
  companyOrganizationName: {
    id: 'powertakerForm.field.companyOrganizationName',
    description: 'companyOrganizationName field in form',
    defaultMessage: 'Name of the organization',
  },
  companyOrganizationRepresentedBy: {
    id: 'powertakerForm.field.companyOrganizationRepresentedBy',
    description: 'companyOrganizationRepresentedBy field in form',
    defaultMessage: 'Represented by',
  },
  companyOrganizationEmail: {
    id: 'powertakerForm.field.companyOrganizationEmail',
    description: 'companyOrganizationEmail field in form',
    defaultMessage: 'E-mail (central mailbox)',
  },
  companyAuthorizationTitle: {
    id: 'powertakerForm.field.companyAuthorizationTitle',
    description: 'companyAuthorizationTitle field in form',
    defaultMessage: 'Authorization',
  },
  companyAuthorizationLabel: {
    id: 'powertakerForm.field.companyAuthorizationLabel',
    description: 'companyAuthorizationLabel field in form',
    defaultMessage: 'I am a contact person and is entitled to conclude power supply contracts for the above mentioned organization.',
  },
  addressStreetName: {
    id: 'powertakerForm.field.addressStreetName',
    description: 'addressStreetName field in form',
    defaultMessage: 'Street (contract partner)',
  },
  addressStreetNumber: {
    id: 'powertakerForm.field.addressStreetNumber',
    description: 'addressStreetNumber field in form',
    defaultMessage: 'House number (contractor)',
  },
  addressAddress: {
    id: 'powertakerForm.field.addressAddress',
    description: 'addressAddress field in form',
    defaultMessage: 'Additional address (contract partner)',
  },
  addressZip: {
    id: 'powertakerForm.field.addressZip',
    description: 'addressZip field in form',
    defaultMessage: 'Postal code (contract partner)',
  },
  addressCity: {
    id: 'powertakerForm.field.addressCity',
    description: 'addressCity field in form',
    defaultMessage: 'City (contract partner)',
  },
  addressState: {
    id: 'powertakerForm.field.addressState',
    description: 'addressState field in form',
    defaultMessage: 'State (Contract partner)',
  },
  contractOtherContract: {
    id: 'powertakerForm.field.contractOtherContract',
    description: 'contractOtherContract field in form',
    defaultMessage: 'I / we already have a power supply contract with buzzn',
  },
  otherAddressStreetName: {
    id: 'powertakerForm.field.otherAddressStreetName',
    description: 'otherAddressStreetName field in form',
    defaultMessage: 'Street (reference point)',
  },
  otherAddressStreetNumber: {
    id: 'powertakerForm.field.otherAddressStreetNumber',
    description: 'otherAddressStreetNumber field in form',
    defaultMessage: 'House number (reference point)',
  },
  otherAddressAddress: {
    id: 'powertakerForm.field.otherAddressAddress',
    description: 'otherAddressAddress field in form',
    defaultMessage: 'Additional address (reference point)',
  },
  otherAddressZip: {
    id: 'powertakerForm.field.otherAddressZip',
    description: 'otherAddressZip field in form',
    defaultMessage: 'Postal code (reference point)',
  },
  otherAddressCity: {
    id: 'powertakerForm.field.otherAddressCity',
    description: 'otherAddressCity field in form',
    defaultMessage: 'City (reference point)',
  },
  otherAddressState: {
    id: 'powertakerForm.field.otherAddressState',
    description: 'otherAddressState field in form',
    defaultMessage: 'State (reference point)',
  },
  meterSerialNumber: {
    id: 'powertakerForm.field.meterSerialNumber',
    description: 'meterSerialNumber field in form',
    defaultMessage: 'Counter number',
  },
  meterProductName: {
    id: 'powertakerForm.field.meterProductName',
    description: 'meterProductName field in form',
    defaultMessage: 'Counted name',
  },
  meteringPointCountingPoint: {
    id: 'powertakerForm.field.meteringPointCountingPoint',
    description: 'meteringPointCountingPoint field in form',
    defaultMessage: 'Counting point:',
  },
  meterMeteringType: {
    id: 'powertakerForm.field.meterMeteringType',
    description: 'meterMeteringType field in form',
    defaultMessage: 'Counter type',
  },
  contractBeginning: {
    id: 'powertakerForm.field.contractBeginning',
    description: 'contractBeginning field in form',
    defaultMessage: 'Day of first delivery',
  },
  oldContractOldName: {
    id: 'powertakerForm.field.oldContractOldName',
    description: 'oldContractOldName field in form',
    defaultMessage: 'From which supplier has electricity been supplied so far?',
  },
  oldContractCustomerNumber: {
    id: 'powertakerForm.field.oldContractCustomerNumber',
    description: 'oldContractCustomerNumber field in form',
    defaultMessage: 'What is your customer number with the previous supplier?',
  },
  oldContractContractNumber: {
    id: 'powertakerForm.field.oldContractContractNumber',
    description: 'oldContractContractNumber field in form',
    defaultMessage: 'What is your contract account number with the previous supplier?',
  },
  contractYearlyKwh: {
    id: 'powertakerForm.field.contractYearlyKwh',
    description: 'contractYearlyKwh field in form',
    defaultMessage: 'Consumption prognosis',
  },
  contractMeteringPointOperator: {
    id: 'powertakerForm.field.contractMeteringPointOperator',
    description: 'contractMeteringPointOperator field in form',
    defaultMessage: 'Name of the measuring point operator',
  },
  bankAccountHolder: {
    id: 'powertakerForm.field.bankAccountHolder',
    description: 'bankAccountHolder field in form',
    defaultMessage: 'account owner',
  },
  bankAccountIban: {
    id: 'powertakerForm.field.bankAccountIban',
    description: 'bankAccountIban field in form',
    defaultMessage: 'IBAN',
  },
  bankAccountDirectDebitTitle: {
    id: 'powertakerForm.field.bankAccountDirectDebitTitle',
    description: 'bankAccountDirectDebitTitle field in form',
    defaultMessage: 'SEPA direct debit mandate',
  },
  bankAccountDirectDebitLabel: {
    id: 'powertakerForm.field.bankAccountDirectDebitLabel',
    description: 'bankAccountDirectDebitLabel field in form',
    defaultMessage: 'I revocably revoke payments from the above account using SEPA Base Loan. At the same time, I instruct my bank to pay the debts drawn by buzzn from my account. I can demand reimbursement of the debited amount within eight weeks, beginning with the debit date. The conditions agreed with my bank apply.',
  },
  contractPowerOfAttorneyTitle: {
    id: 'powertakerForm.field.contractPowerOfAttorneyTitle',
    description: 'contractPowerOfAttorneyTitle field in form',
    defaultMessage: 'Power of attorney',
  },
  contractPowerOfAttorneyLabel: {
    id: 'powertakerForm.field.contractPowerOfAttorneyLabel',
    description: 'contractPowerOfAttorneyLabel field in form',
    defaultMessage: 'Herewith I give buzzn Vollmacht',
  },
  contractTermsTitle: {
    id: 'powertakerForm.field.contractTermsTitle',
    description: 'contractTermsTitle field in form',
    defaultMessage: 'Terms and Conditions (GTC)',
  },
  contractTermsLabel: {
    id: 'powertakerForm.field.contractTermsLabel',
    description: 'contractTermsLabel field in form',
    defaultMessage: 'Yes, I have received the terms and conditions and I agree with them',
  },
  contractMessageToBuzzn: {
    id: 'powertakerForm.field.contractMessageToBuzzn',
    description: 'contractMessageToBuzzn field in form',
    defaultMessage: 'My message to the buzzn team:',
  },
  contractHearAboutBuzzn: {
    id: 'powertakerForm.field.contractHearAboutBuzzn',
    description: 'contractHearAboutBuzzn field in form',
    defaultMessage: 'How did you hear about buzzn?',
  },
});

const PowerForm = injectIntl(({
  handleSubmit,
  pristine,
  submitting,
  valid,
  formValues,
  intl,
}) => {
  const titles = [
    { value: 'Dr.', title: intl.formatMessage(messages.titlesDr) },
    { value: 'Dr. habil.', title: intl.formatMessage(messages.titlesDrHabil) },
    { value: 'Prof.', title: intl.formatMessage(messages.titlesProf) },
  ];
  const gender = [
    { value: 'male', title: intl.formatMessage(messages.genderMale) },
    { value: 'female', title: intl.formatMessage(messages.genderFemale) },
    { value: 'noInformation', title: intl.formatMessage(messages.genderUnknown) },
  ];
  const legalEntity = [
    { value: 'natural_person', title: intl.formatMessage(messages.legalEntityPerson) },
    { value: 'company', title: intl.formatMessage(messages.legalEntityCompany) },
  ];
  const cateringPermit = [
    { value: 'yes', title: intl.formatMessage(messages.cateringPermitYes) },
    { value: 'no', title: intl.formatMessage(messages.cateringPermitNo) },
    { value: 'unknown', title: intl.formatMessage(messages.cateringPermitUnknown) },
  ];
  const reseller = [
    { value: 'yes', title: intl.formatMessage(messages.resellerYes) },
    { value: 'no', title: intl.formatMessage(messages.resellerNo) },
    { value: 'unknown', title: intl.formatMessage(messages.resellerUnknown) },
  ];
  const contractorAddress = [
    { value: 'same', title: intl.formatMessage(messages.contractorAddressSame) },
    { value: 'other', title: intl.formatMessage(messages.contractorAddressOther) },
  ];
  const virtualCounter = [
    { value: 'yes', title: intl.formatMessage(messages.virtualCounterYes) },
    { value: 'no', title: intl.formatMessage(messages.virtualCounterNo) },
    { value: 'unknown', title: intl.formatMessage(messages.virtualCounterUnknown) },
  ];
  const moveIn = [
    { value: 'yes', title: intl.formatMessage(messages.moveInYes) },
    { value: 'no', title: intl.formatMessage(messages.moveInNo) },
  ];
  const newMeterOperator = [
    { value: 'yes', title: intl.formatMessage(messages.newMeterOperatorYes) },
    { value: 'no', title: intl.formatMessage(messages.newMeterOperatorNo) },
    { value: 'unknown', title: intl.formatMessage(messages.newMeterOperatorUnknown) },
  ];
  const states = [
    { value: 'Baden-Würrtemberg', title: 'Baden-Würrtemberg' },
    { value: 'Bayern', title: 'Bayern' },
    { value: 'Berlin', title: 'Berlin' },
    { value: 'Brandenburg', title: 'Brandenburg' },
    { value: 'Bremen', title: 'Bremen' },
    { value: 'Hamburg', title: 'Hamburg' },
    { value: 'Hessen', title: 'Hessen' },
    { value: 'Niedersachsen', title: 'Niedersachsen' },
    { value: 'Nordrhein-Westfalen', title: 'Nordrhein-Westfalen' },
    { value: 'Mecklemburg-Vorpommern', title: 'Mecklemburg-Vorpommern' },
    { value: 'Rheinland-Pfalz', title: 'Rheinland-Pfalz' },
    { value: 'Saarland', title: 'Saarland' },
    { value: 'Sachsen', title: 'Sachsen' },
    { value: 'Sachsen-Anhalt', title: 'Sachsen-Anhalt' },
    { value: 'Schleswig-Holstein', title: 'Schleswig-Holstein' },
    { value: 'Thüringen', title: 'Thüringen' },
  ];

  const renderError = ({ disabled, meta: { touched, error } }) => (
    touched && error && !disabled ? <div className="error">{error}</div> : false
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h6>
          <FormattedMessage
            id="powertakerForm.header.prices"
            description="Prices header"
            defaultMessage="Prices" />
        </h6>
        <Field name="energypriceCentsPerKilowattHour" type="text" label={ intl.formatMessage(messages.energypriceCentsPerKilowattHour) } component={InputField} disabled="true" />
        <Field name="basepriceCentsPerMonth" type="text" label={ intl.formatMessage(messages.basepriceCentsPerMonth) } component={InputField} disabled="true" />
        <Field name="totalCentsPerMonth" type="text" label={ intl.formatMessage(messages.totalCentsPerMonth) } component={InputField} disabled="true" />
        <FormattedMessage
          id="powertakerForm.text.prices"
          description="Prices text in form"
          defaultMessage="All prices include all statutory duties, taxes and levies." />
        <h6>
          <FormattedMessage
            id="powertakerForm.header.person"
            description="Contact person header"
            defaultMessage="Contact Person" />
        </h6>
        <Field
          name="profile/title"
          label={ intl.formatMessage(messages.profileTitle) }
          component={SelectField}
          options={titles}
          defaultOption={{
            value: '',
            title: '',
          }} />
        <Field name="profile/firstName" type="text" label={ intl.formatMessage(messages.profileFirstName) } component={InputField} />
        <Field name="profile/lastName" type="text" label={ intl.formatMessage(messages.profileLastName) } component={InputField} />
        <div className="row">
          <label className="col-sm-4 col-xs-12 col-form-label">
            <FormattedMessage
              id="powertakerForm.field.profileGender"
              description="profileGender field in form"
              defaultMessage="Gender" />
          </label>
          <div className="col-sm-8 col-xs-12">
            <Field name="profile/gender" component={renderError}/>
            {gender.map(d => (
              <label key={d.value} className="custom-control custom-radio">
                <Field className="custom-control-input" name="profile/gender" component="input" type="radio" value={d.value}/>
                <span className="custom-control-indicator"></span>
                <span className="custom-control-description">{d.title}</span>
              </label>
              ))}
          </div>
        </div>
        <Field name="profile/phone" type="text" label={ intl.formatMessage(messages.profilePhone) } component={InputField} />
        <h6>
          <FormattedMessage
            id="powertakerForm.header.contractingParty"
            description="Contractirng party header in form"
            defaultMessage="Contract partners" />
        </h6>
        <div className="row">
          <label className="col-sm-4 col-xs-12 col-form-label">
            <FormattedMessage
              id="powertakerForm.field.contractingPartyLegalEntity"
              description="contractingPartyLegalEntity field in form"
              defaultMessage="Who should become a contract partner?" />
          </label>
          <div className="col-sm-8 col-xs-12">
            <Field name="contractingParty/legalEntity" component={renderError}/>
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
          { formValues['contractingParty/legalEntity'] === 'company' &&
            <div>
              <Field name="company/organization/name" type="text" label={ intl.formatMessage(messages.companyOrganizationName) } component={InputField} />
              <Field name="company/organization/representedBy" type="text" label={ intl.formatMessage(messages.companyOrganizationRepresentedBy) } component={InputField} />
              <Field name="company/organization/email" type="text" label={ intl.formatMessage(messages.companyOrganizationEmail) } component={InputField} />
              <Field
                name="company/authorization"
                title={ intl.formatMessage(messages.companyAuthorizationTitle) }
                label={ intl.formatMessage(messages.companyAuthorizationLabel) }
                type="checkbox"
                component={CheckboxField} />
            </div>
          }
        </ReactCSSTransitionGroup>
        <Field name="address/streetName" type="text" label={ intl.formatMessage(messages.addressStreetName) } component={InputField} />
        <Field name="address/streetNumber" type="text" label={ intl.formatMessage(messages.addressStreetNumber) } component={InputField} />
        <Field name="address/address" type="text" label={ intl.formatMessage(messages.addressAddress) } component={InputField} />
        <Field name="address/zip" type="text" label={ intl.formatMessage(messages.addressZip) } component={InputField} disabled="true" />
        <Field name="address/city" type="text" label={ intl.formatMessage(messages.addressCity) } component={InputField} />
        <Field
          name="address/state"
          label={ intl.formatMessage(messages.addressState) }
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
          { formValues['contractingParty/legalEntity'] === 'company' &&
            <div>
              <div className="row">
                <label className="col-sm-4 col-xs-12 col-form-label">
                  <FormattedMessage
                    id="powertakerForm.field.contractingPartyProviderPermission"
                    description="contractingPartyProviderPermission field in form"
                    defaultMessage="Do you own a utility license?" />
                </label>
                <div className="col-sm-8 col-xs-12">
                  <Field name="contractingParty/providerPermission" component={renderError}/>
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
                <label className="col-sm-4 col-xs-12 col-form-label">
                  <FormattedMessage
                    id="powertakerForm.field.companyOrganizationRetailer"
                    description="companyOrganizationRetailer field in form"
                    defaultMessage="Are your reseller?" />
                </label>
                <div className="col-sm-8 col-xs-12">
                  <Field name="company/organization/retailer" component={renderError}/>
                  {reseller.map(d => (
                    <label key={d.value} className="custom-control custom-radio">
                      <Field className="custom-control-input" name="company/organization/retailer" component="input" type="radio" value={d.value}/>
                      <span className="custom-control-indicator"></span>
                      <span className="custom-control-description">{d.title}</span>
                    </label>
                    ))}
                </div>
              </div>
            </div>
          }
        </ReactCSSTransitionGroup>
        <Field
          label={ intl.formatMessage(messages.contractOtherContract) }
          name="contract/otherContract"
          component={CheckboxField}
          type="checkbox" />
        <h6>
          <FormattedMessage
            id="powertakerForm.header.referencePoint"
            description="Reference point header"
            defaultMessage="Reference point" />
        </h6>
        <div className="row">
          <label className="col-sm-4 col-xs-12 col-form-label">
            <FormattedMessage
              id="powertakerForm.field.contractorAddress"
              description="contractorAddress field in form"
              defaultMessage="Where do you want to buy buzzn electricity?" />
          </label>
          <div className="col-sm-8 col-xs-12">
            <Field name="#contractorAddress" component={renderError}/>
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
          { formValues['#contractorAddress'] === 'other' &&
            <div>
              <Field name="otherAddress/streetName" type="text" label={ intl.formatMessage(messages.otherAddressStreetName) } component={InputField} />
              <Field name="otherAddress/streetNumber" type="text" label={ intl.formatMessage(messages.otherAddressStreetNumber) } component={InputField} />
              <Field name="otherAddress/address" type="text" label={ intl.formatMessage(messages.otherAddressAddress) } component={InputField} />
              <Field name="otherAddress/zip" type="text" label={ intl.formatMessage(messages.otherAddressZip) } component={InputField} />
              <Field name="otherAddress/city" type="text" label={ intl.formatMessage(messages.otherAddressCity) } component={InputField} />
              <Field
                name="otherAddress/state"
                label={ intl.formatMessage(messages.otherAddressState) }
                component={SelectField}
                options={states}
                defaultOption={{
                  value: '',
                  title: '',
                }} />
            </div>
          }
        </ReactCSSTransitionGroup>
        <Field name="meter/manufacturerProductSerialnumber" type="text" label={ intl.formatMessage(messages.meterSerialNumber) } component={InputField} />
        <Field name="meter/manufacturerProductName" type="text" label={ intl.formatMessage(messages.meterProductName) } component={InputField} />
        <Field name="#meteringPoint/countingPoint" type="text" label={ intl.formatMessage(messages.meteringPointCountingPoint) } component={InputField} />
        <Field name="meter/meteringType" type="text" label={ intl.formatMessage(messages.meterMeteringType) } component={InputField} disabled="true" />
        <div className="row">
          <label className="col-sm-4 col-xs-12 col-form-label">
            <FormattedMessage
              id="powertakerForm.field.meteringPointVirtual"
              description="meteringPointVirtual field in form"
              defaultMessage="Is the counter virtual?" />
          </label>
          <div className="col-sm-8 col-xs-12">
            <Field name="#meteringPoint/virtual" component={renderError}/>
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
          <label className="col-sm-4 col-xs-12 col-form-label">
            <FormattedMessage
              id="powertakerForm.field.contractMoveIn"
              description="contractMoveIn field in form"
              defaultMessage="Do you re-enter there?" />
          </label>
          <div className="col-sm-8 col-xs-12">
            <Field name="contract/moveIn" component={renderError}/>
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
          { formValues['contract/moveIn'] === 'yes' ?
            <div>
              <Field name="contract/beginning" label={ intl.formatMessage(messages.contractBeginning) } component={DateField} />
            </div> :
            <div>
              <Field name="oldContract/oldElectricitySupplierName" type="text" label={ intl.formatMessage(messages.oldContractOldName) } component={InputField} />
              <Field name="oldContract/customerNumber" type="text" label={ intl.formatMessage(messages.oldContractCustomerNumber) } component={InputField} />
              <Field name="oldContract/contractNumber" type="text" label={ intl.formatMessage(messages.oldContractContractNumber) } component={InputField} />
            </div> }
        </ReactCSSTransitionGroup>
        <Field name="contract/yearlyKilowattHour" type="text" label={ intl.formatMessage(messages.contractYearlyKwh) } component={InputField} disabled="true" />
        <div className="row">
          <label className="col-sm-4 col-xs-12 col-form-label">
            <FormattedMessage
              id="powertakerForm.field.newMeterOperator"
              description="newMeterOperator field in form"
              defaultMessage="Did you assign a new measuring point operator for the reference point?" />
          </label>
          <div className="col-sm-8 col-xs-12">
            <Field name="#newMeterOperator" component={renderError}/>
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
          { formValues['#newMeterOperator'] === 'yes' &&
            <Field name="contract/meteringPointOperatorName" type="text" label={ intl.formatMessage(messages.contractMeteringPointOperator) } component={InputField} />
          }
        <Field name="bankAccount/holder" type="text" label={ intl.formatMessage(messages.bankAccountHolder) } component={InputField} />
        <Field name="bankAccount/iban" type="text" label={ intl.formatMessage(messages.bankAccountIban) } component={InputField} />
        <Field
          title={ intl.formatMessage(messages.bankAccountDirectDebitTitle) }
          label={ intl.formatMessage(messages.bankAccountDirectDebitLabel) }
          name="bankAccount/directDebit"
          component={CheckboxField}
          type="checkbox" />
        <Field
          title={ intl.formatMessage(messages.contractPowerOfAttorneyTitle) }
          label={ intl.formatMessage(messages.contractPowerOfAttorneyLabel) }
          name="contract/powerOfAttorney"
          component={CheckboxField}
          type="checkbox" />
        <Field
          title={ intl.formatMessage(messages.contractTermsTitle) }
          label={ intl.formatMessage(messages.contractTermsLabel) }
          name="contract/terms"
          component={CheckboxField}
          type="checkbox" />
        <h6>
          <FormattedMessage
            id="powertakerForm.header.feedback"
            description="Feedback header"
            defaultMessage="Feedback" />
        </h6>
        <Field name="contract/messageToBuzzn" label={ intl.formatMessage(messages.contractMessageToBuzzn) } component={TextAreaField} />
        <Field name="contract/hearAboutBuzzn" label={ intl.formatMessage(messages.contractHearAboutBuzzn) } component={TextAreaField} />
        </ReactCSSTransitionGroup>
        <button
          disabled={ submitting || !valid }
          action="submit"
          className="btn btn-outline-primary">
          <FormattedMessage
            id="powertakerForm.button.submit"
            description="Submit button"
            defaultMessage="Submit" />
        </button>
      </form>
    </div>
  );
});

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
