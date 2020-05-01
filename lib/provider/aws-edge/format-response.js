"use strict";
const http = require("http");
const zlib = require("zlib");

const isBinary = require("./is-binary");
const Response = require("../../response");
const sanitizeHeaders = require("./sanitize-headers");

module.exports = (response, options) => {
  const { statusCode } = response;
  const headers = Response.headers(response);

  if (headers["transfer-encoding"] === "chunked" || response.chunkedEncoding) {
    throw new Error("chunked encoding not supported");
  }

  const isBase64Encoded = isBinary(headers, options);
  const encoding = isBase64Encoded ? "base64" : "utf8";
  let body = Response.body(response);
  if (options.compress && isBase64Encoded) {
    body = zlib.gzipSync(body);
    headers["Content-Encoding"] = "gzip";
  }
  body = body.toString(encoding);

  return {
    status: statusCode,
    statusDescription: http.STATUS_CODES[statusCode],
    headers: sanitizeHeaders(headers),
    body,
    bodyEncoding: isBase64Encoded ? "base64" : "text",
  };
};
