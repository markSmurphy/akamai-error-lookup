#!/usr/bin/env node
/*jshint esversion: 6 */

// Use 'moment' to do time difference calculations
const moment = require('moment');
const startTime = moment();

// console.log colours
const colours = require('colors');

// Get O/S specific properties
const os = require('os');

// set defaults
var authFilename = 'auth.edgerc';
var authSection = 'default';
const URL_AKA_EDGERC = 'https://developer.akamai.com/introduction/Conf_Client.html';

// Check for 'help' command line parameters, or no parameters at all
if ((process.argv.length == 2) || (process.argv[2].toLowerCase() == "-h") || (process.argv[2].toLowerCase() == "--help")) {
    // use package.json to acquire version number
    const package = require('./package.json');

    // display help screen
    console.log('\u2726 [akamai-error-lookup]'.cyan);
    console.log('Read the docs: '.green + 'https://github.com/MarkSMurphy/akamai-error-lookup#readme');
    console.log('Support & bugs: '.magenta + 'https://github.com/MarkSMurphy/akamai-error-lookup/issues');
    console.log(os.EOL);
    console.log('Returns details about an Akamai #Ref error.'.italic);
    console.log(os.EOL);
    console.log('VERSION:'.grey);
    console.log('   ' + package.version.bold);
    console.log(os.EOL);
    console.log('USAGE:'.grey);
    console.log('   ' + 'hashref errorReference'.bold);
    console.log(os.EOL);
    console.log('EXAMPLE:'.grey);
    console.log('   hashref 18.2d351ab8.1557333295.a4e16ab');

  } else {

    // check if edgegrid authentication file exists
    const fs = require('fs');

    try {
        if (fs.existsSync(authFilename)) {
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
                path: authFilename,
                section: authSection
            });

            // construct HTTP request
            eg.auth({
                path: '/diagnostic-tools/v2/errors/' + hashReference + '/translated-error',
                method: 'GET',
                headers: {
                    'Content-Type': "application/json"
                },
                body: ''
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
                    if(objJSON.hasOwnProperty('title')){
                        console.log('%s'.red, objJSON.title);
                    }

                    if(objJSON.hasOwnProperty('status')){
                        console.log('%s'.red, objJSON.status);
                    }

                    if(objJSON.hasOwnProperty('detail')){
                        console.log('%s'.red, objJSON.detail);
                    }

                    if(objJSON.hasOwnProperty('errors')){
                        console.log('%s'.red, objJSON.errors[0].error);
                    }

                }
            });
        } else {
            console.log('The authentication file [' + authFilename.yellow + '] was not found.');
            console.log('Refer to ' + URL_AKA_EDGERC.green + ' for details on configuring your client.');
        }
    } catch(err) {
        console.error(err);
    }
}