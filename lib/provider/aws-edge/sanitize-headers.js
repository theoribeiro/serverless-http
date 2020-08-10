"use strict";

const setCookieVariations = require("./set-cookie.json").variations;
const readOnlyHeaders = [
  "memoept-encoding",
  "content-length",
  "if-modified-since",
  "if-none-Match",
  "if-range",
  "if-unmodified-since",
  "range",
  "transfer-encoding",
  "via",
];

module.exports = function sanitizeHeaders(headers) {
  const sanitizedHeaders = Object.keys(headers).reduce((memo, key) => {
    const value = headers[key];
    const normalizedKey = key.toLowerCase();

    if (readOnlyHeaders.includes(normalizedKey)) {
      return memo;
    }

    if (Array.isArray(value) && normalizedKey === "set-cookie") {
      memo["set-cookie"] = memo["set-cookie"] || [];
      value.forEach((cookie) => {
        memo["set-cookie"].push({ key: "Set-Cookie", value: cookie });
      });

      return memo;
    }

    if (memo[normalizedKey]) {
      memo[normalizedKey].push({
        key: key,
        value: value,
      });

      return memo;
    }

    memo[normalizedKey] = [
      {
        key: key,
        value: value,
      },
    ];

    return memo;
  }, {});

  return sanitizedHeaders;
};
