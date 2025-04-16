const codes = require('./responseCode');

/**
 * @class ResponseHandler
 * @description Handles sending HTTP responses
 */

class ResponseHandler {
  send(res, options, header = {}) {
    const response = {};

    response.status = options.status[0];
    response.success = response.status === 200 || response.status=== 201;
    if (options.message) {
      response.message = options.message;
    }

    // Only include data if options.data is explicitly passed
    if ('data' in options) {
      const payloadKey = options.payloadKey || 'data';
      response[payloadKey] = options.data;
    }

    res.status(response.status)
      .set(header)
      .send(response);
  }

  getCode() {
    return codes;
  }
}

module.exports = ResponseHandler;
