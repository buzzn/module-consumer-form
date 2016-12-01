import forEach from 'lodash/forEach';

const validationMessages = {
  required: {
    firstName: 'Please enter your First Name',
    lastName: 'Please enter your Last Name',
    gender: 'Please choose your gender',
    phone: 'Please enter your phone',
    email: 'Please enter your email',
    contractorPerson: 'Please choose contractor type',
    organizationName: 'Please enter organization name',
    representedBy: 'Please enter represented by',
    organizationEmail: 'Please enter organization email',
    organizationAuthorization: 'Please specify that you are organization representative',
    cateringPermit: 'Please choose catering permit',
    reseller: 'Please specify your reseller status',
    street: 'Please enter street',
    houseNumber: 'Please enter house number',
    zip: 'Please enter zip code',
    state: 'Please choose state',
    contractorAddress: 'Please select your address',
    otherStreet: 'Please enter street',
    otherHouseNumber: 'Please enter house number',
    otherZip: 'Please enter zip code',
    otherState: 'Please choose state',
    counterNumber: 'Please enter your counter number',
    countingPoint: 'Please enter your counting point',
    virtualCounter: 'Please choose your counter type',
    firstContract: 'Please choose your contract type',
    startDate: 'Please specify start date',
    previousProvider: 'Please enter your previous provider',
    previousCustomerNumber: 'Please enter your previous customer number',
    previousAccountNumber: 'Please enter your previous account number',
    consumptionForecast: 'Please enter consumptionForecast',
  },
};

export const validateRequired = ({ values, fields }) => {
  const errors = {};
  forEach(fields, field => {
    if (!values[field] || values[field].length === 0) {
      errors[field] = validationMessages.required[field] || `Please fill ${field}`;
    }
  });
  return errors;
};
