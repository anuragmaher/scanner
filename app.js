// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var google = require('./app/google');
var processResponse = require('./app/processResponse');
var sampleResponse = require('./sampleResponse');
var email = require('./app/email');

const { check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// Middleware to use for all requests
// Added for later use
router.use(function(req, res, next) {
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/scanner')
  .post([
    check('fromEmail')
    .isEmail()
    .withMessage('Must be an email'),

    check('origin')
    .isLength({ min: 3 })
    .withMessage('Origin must be of at least 3 characters'),

    check('destination')
    .isLength({ min: 3 })
    .withMessage('Destination must be of at least 3 characters'),

    check('departurePreference')
      .isIn(['morning', 'afternoon', 'evening', 'night'])
      .optional()
      .withMessage('departurePreference must be either morning, evening, afternoon or night'),

  ], function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    const { fromEmail, origin, destination, date } = req.body;

    /*
    This is used in case if we want to test with sample response
    const { tripOption } = sampleResponse;
    const body = processResponse.parseResponse(fromEmail, tripOption);
    email.sendmail(fromEmail, body);
    res.json(body);
    */

    google.makeAPIrequest(origin, destination, date)
      .then(function (response){
        const { tripOption } = response.trips;
        const body = processResponse.parseResponse(fromEmail, tripOption);
        email.sendmail(fromEmail, body);
        res.json(tripOption);
      });
  });

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
