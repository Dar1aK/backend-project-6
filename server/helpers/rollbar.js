import Rollbar from 'rollbar';

var rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

export const rollbarError = (label, error) => {
  return process.env.NODE_ENV !== 'test' && rollbar.log(label, error)
}