/*jshint esversion: 6 */

// Use 'moment' to do time difference calculations
var moment = require('moment');
var startTime = moment();

// Console.log colours
var colours = require('colors');

// Get O/S specific properties
var os = require('os');

// pretty print json objects to console
var prettyjson = require('prettyjson');

// Obtain the array of command line arguments
var Args = process.argv.slice(2);

// Retrieve the SiteShield map ID supplied
var hashReference = Args[0];

// Akamai's authentication header builder
var EdgeGrid = require('edgegrid');

// Supply the path to your .edgerc file and name
// of the section with authorization to the client
// you are calling (default section is 'default')
var eg = new EdgeGrid({
    path: 'auth.edgerc',
    section: 'default'
});

// construct HTTP request
eg.auth({
    path: '/diagnostic-tools/v2/errors/' + hashReference + '/translated-error',
    method: 'GET',
    headers: {
        'Content-Type': "application/json"
    },
    body: ""
});

// Send request and write output to the console
eg.send(function(error, response, body) {
    // Record end time
    var endTime = moment();
    console.log(moment(endTime).diff(startTime, 'seconds') + ' seconds');

    if (error){
        console.log(colours.red(error));
    }

    var objJSON = JSON.parse(body);

    console.log('---- Raw Response ----'.blue);
    console.log(prettyjson.render(objJSON, {}));

    if (response.statusCode == 200){
        const Entities = require('html-entities').AllHtmlEntities;

        const entities = new Entities();

        console.log('---- Parsed Response ----'.blue);

        console.log('%s'.red, objJSON.translatedError.reasonForFailure);
        console.log('%s'.red, objJSON.translatedError.logs[0].fields.error);

        console.log('%s'.yellow, 'URL:');
        console.log(entities.decode(objJSON.translatedError.url));

        console.log('%s'.yellow, 'Method:');
        console.log(objJSON.translatedError.requestMethod);

        console.log('%s'.yellow, 'Response Code:');
        console.log('%s'.red, objJSON.translatedError.httpResponseCode);

        console.log('%s'.yellow, 'Origin Hostname:');
        console.log(objJSON.translatedError.originHostname);

        console.log('%s'.yellow, 'Origin IP Address:');
        console.log(objJSON.translatedError.originIp);

        console.log('%s'.yellow, 'User-agent:');
        console.log(entities.decode(objJSON.translatedError.userAgent));

        console.log('%s'.yellow, 'Client IP Address:');
        console.log(objJSON.translatedError.clientIp);

        console.log('%s'.yellow, 'Timestamp:');
        console.log(objJSON.translatedError.timestamp);

        console.log('%s'.yellow, 'Web Application Firewall [WAF] Details:');
        console.log(objJSON.translatedError.wafDetails);

        // Write output to file
        const fs = require('fs');
        const path = require('path');
        const outputFile = os.tmpdir + path.sep + hashReference + ".json";
        console.log(os.EOL + 'Writing full response to [' + outputFile + ']');
        fs.writeFile(outputFile, body, (err) => {
            if (err) {
                console.log('Error writing file: %O', err);
            }
        });

    } else {
        console.log('%s'.red, objJSON.title);
        console.log('%s'.red, objJSON.status);
        console.log('%s'.red, objJSON.detail);
        console.log('%s'.red, objJSON.errors[0].error);
    }

});
