import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const rollbarError = (label, error) => process.env.NODE_ENV !== 'test' && rollbar.log(label, error);

export default rollbarError;
