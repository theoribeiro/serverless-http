'use strict';

function getPath({ uri }) {
  return typeof uri === 'string' ? uri : '/';
}

module.exports = function cleanupEvent(evt, options) {
  const event = (evt &&
    evt.Records &&
    evt.Records.length > 0 &&
    evt.Records[0].cf) ||
    {};

  event.config = event.config || {};
  
  event.request = event.request || {};
  event.request.body = event.request.body || '';
  event.request.headers = event.request.headers || {};
  event.request.method = event.request.method || 'GET';
  event.rquest.uri = getPath(event.request);

  // event.requestContext = event.requestContext || {};
  // event.requestContext.identity = event.requestContext.identity || {};
  // event.httpMethod = event.httpMethod || 'GET';
  // event.path = getPath(event);
  // event.body = event.body || '';
  // event.headers = event.headers || {};

  if (options.basePath) {
    const basePathIndex = event.path.indexOf(options.basePath);

    if (basePathIndex > -1) {
      event.path = event.path.substr(basePathIndex + options.basePath.length);
    }
  }

  return event;
};
