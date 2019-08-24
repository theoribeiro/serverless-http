'use strict';

const setCookieVariations = require('./set-cookie.json').variations;
const readOnlyHeaders = [
  "accept-encoding",
  "content-length",
  "if-modified-since",
  "if-none-Match",
  "if-range",
  "if-unmodified-since",
  "range",
  "transfer-encoding",
  "via"
];

module.exports = function sanitizeHeaders(headers) {
  // return Object.keys(headers).reduce((memo, key) => {
  //   const value = headers[key];

  //   if (Array.isArray(value)) {
  //     if (key.toLowerCase() === 'set-cookie') {
  //       value.forEach((cookie, i) => {
  //         memo[setCookieVariations[i]] = cookie;
  //       });
  //     } else {
  //       memo[key] = value.join(', ');
  //     }
  //   } else {
  //     memo[key] = value.toString();
  //   }

  //   return memo;
  // }, {});
  return Object.keys(headers).reduce((acc, key) => {
    let normalizedKey = key.toLowerCase();
    if (!readOnlyHeaders.includes(normalizedKey)) {
        if (acc[normalizedKey]) {
            acc[normalizedKey].push({
                key: key,
                value: headers[key]
            });
        } else {
            acc[normalizedKey] = [{
                key: key,
                value: headers[key]
            }];
        }
    }
    return acc;
  }, {});
};
