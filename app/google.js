const config = require('../config.js');
var request = require('request');
var requestPromise = require('request-promise');

const GOOGLE_URL = 'https://www.googleapis.com/qpxExpress/v1/trips/search';
var URL = GOOGLE_URL + '?key=' + config.googleKey;

// Set the headers
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/json'
}


module.exports = {
  makeAPIrequest: function(origin, destination, date) {

    var sampleJson = {
      request : {
        passengers: {
          adultCount: '1'
        },
        slice: [
          {
            origin: origin,
            destination: destination,
            date: date
          }
        ],
        solutions: '3'
      }
    };

    // Configure the request
    var options = {
        url: URL,
        method: 'POST',
        headers: headers,
        json: sampleJson
    }

    return requestPromise(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          // Print out the response body
          //console.log(body);
          return body.tripOption;
      }
    });
  },
};
