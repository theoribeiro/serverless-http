const aws = require('./aws');
const awsEdge = require('./aws-edge');

const providers = {
  aws,
  awsEdge
};

module.exports = function getProvider(options) {
  const { provider = 'aws' } = options;

  if (provider in providers) {
    return providers[provider](options);
  }

  throw new Error(`Unsupported provider ${provider}`);
};
