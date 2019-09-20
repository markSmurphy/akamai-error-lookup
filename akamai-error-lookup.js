#!/usr/bin/env node

var debug = require('debug')('hashref');
debug('[%s] started: %O', __filename, process.argv);

// command line options parser
var argv = require('yargs')
.help(false)
.argv;

// Use 'moment' to do time difference calculations
const moment = require('moment');
const startTime = moment();

// console.log colours
// eslint-disable-next-line no-unused-vars
const colours = require('colors');

// Get O/S specific properties
const os = require('os');

// Set defaults
var authFilename = 'auth.edgerc';
var authSection = 'default';
var authFilenameExists = true;
var decode = true;
const homedir = require('os').homedir();
const URL_AKA_EDGERC = 'https://developer.akamai.com/introduction/Conf_Client.html';

if ((process.argv.length === 2) || (argv.help)) {
    // Show help screen
    const help = require('./help');
    help.helpScreen();
  } else {
    // Process CLI arguments

    if (argv.decode === 'false') {
        decode = false;
    }

    // Check if edgegrid authentication file exists
    const fs = require('fs');

    try {
        debug('Looking for [%s] in [%s] ...', authFilename, process.cwd());
        if (fs.existsSync(authFilename)) {

            // file exist in current directory
            debug('[%s] found', authFilename);
            console.log ('Found [' + authFilename.yellow + '] in [' + process.cwd().yellow + ']');

        } else {

            debug('[%s] not found', authFilename);
            debug('Looking for [%s] in [%s] ...', authFilename, homedir);

            if (fs.existsSync(homedir + '\\' + authFilename))
            {
                // file exist in home directory
                debug('[%s] found', authFilename);
                console.log ('Found [' + authFilename.yellow + '] in [' + homedir.yellow + ']')  ;
                authFilename = homedir + '\\' + authFilename;

            } else {
                // Maybe check in __dirname at this point
                // No auth file was found
                authFilenameExists = false;
            }
        }

        if (authFilenameExists) {
            // pretty print json objects to console
            var prettyjson = require('prettyjson');

            // Obtain the array of command line arguments
            var Args = process.argv.slice(2);
            var hashReference = '';

            // Retrieve the error reference # from the CLI arguments.  It's bound to be the longest one as they're ~30 characters in length
            if (Args.length === 1) {
                // If there's only one argument then just use it
                hashReference = Args[0];
            } else {
                var longestArg = 0;
                var longestArgLength = 0;
                // Loop through arguments looking for the longest one
                for (let i = 0; i < Args.length; i++) {
                    if (Args[i].length > longestArgLength) {
                        // Remember the index of the currently longest argument
                        longestArg = i;
                        // Remember the length
                        longestArgLength = Args[i].length;
                    }
                }
                // Set the error reference number as the longest CLI argument
                hashReference = Args[longestArg];
            }

            // Akamai's authentication header builder
            var EdgeGrid = require('edgegrid');

            // Supply the path to your .edgerc file and name
            // of the section with authorization to the client
            // you are calling (default section is 'default')
            var eg = new EdgeGrid({
                path: authFilename,
                section: authSection
            });

            const urlPath = '/diagnostic-tools/v2/errors/' + hashReference + '/translated-error';

            // construct HTTP request
            eg.auth({
                path: urlPath,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: ''
            });

            debug('EdgeGrid request object: %O', eg.request);
            console.log('Sending https request to ' + urlPath.yellow + ' ....');

            // Send request and write output to the console
            eg.send(function(error, response, body) {
                // Record end time
                var endTime = moment();
                console.log('Received a response in ' + moment(endTime).diff(startTime, 'seconds') + ' seconds');

                debug('Full Response:');
                debug('Response: %O', response);

                if (error){
                    console.log('An error occurred'.red);
                    console.log(error);
                }

                var objJSON = JSON.parse(body);

                debug('Parsed JSON Response:');
                debug(prettyjson.render(objJSON, {}));

                if (response.statusCode === 200){
                    // HTML decoding object
                    const Entities = require('html-entities').AllHtmlEntities;
                    const entities = new Entities();

                    console.log(os.EOL);
                    console.log('%s'.red, objJSON.translatedError.reasonForFailure);

                    if(Object.prototype.hasOwnProperty.call(objJSON.translatedError, 'logs')){
                        objJSON.translatedError.logs.forEach(function(log) {
                            if(Object.prototype.hasOwnProperty.call(log.fields, 'error')){
                                if (decode) {
                                    // Decode string and display it
                                    console.log('%s'.red, entities.decode(log.fields.error));
                                } else {
                                    // Display raw string
                                    console.log('%s'.red, log.fields.error);
                                }
                            }
                        });
                    }

                    console.log(os.EOL);

                    console.log('%s'.yellow, 'URL:');
                    if (decode) {
                        // Decode string and display it
                        console.log(decodeURI(objJSON.translatedError.url));
                    } else {
                        // Display raw string
                        console.log(objJSON.translatedError.url);
                    }

                    console.log('%s'.yellow, 'Method:');
                    console.log(objJSON.translatedError.requestMethod);

                    console.log('%s'.yellow, 'Response Code:');
                    console.log('%s'.red, objJSON.translatedError.httpResponseCode);

                    console.log('%s'.yellow, 'Origin Hostname:');
                    console.log(objJSON.translatedError.originHostname);

                    console.log('%s'.yellow, 'Origin IP Address:');
                    console.log(objJSON.translatedError.originIp);

                    console.log('%s'.yellow, 'User-agent:');
                    if (decode) {
                        // Decode string and display it
                        console.log(decodeURI(objJSON.translatedError.userAgent));
                    } else {
                        // Display raw string
                        console.log(objJSON.translatedError.userAgent);
                    }

                    console.log('%s'.yellow, 'Client IP Address:');
                    console.log(objJSON.translatedError.clientIp);

                    console.log('%s'.yellow, 'Timestamp:');
                    console.log(objJSON.translatedError.timestamp);

                    console.log('%s'.yellow, 'Web Application Firewall [WAF] Details:');
                    console.log(objJSON.translatedError.wafDetails);

                    // Write output to file
                    const fs = require('fs');
                    const path = require('path');
                    const outputFile = os.tmpdir + path.sep + hashReference + '.json';
                    console.log(os.EOL + 'Writing full response to [' + outputFile + ']');
                    fs.writeFile(outputFile, body, (err) => {
                        if (err) {
                            console.log('Error writing file: %O', err);
                        }
                    });

                } else {
                    if(Object.prototype.hasOwnProperty.call(objJSON, 'title')){
                        console.log('%s'.red, objJSON.title);
                    }

                    if(Object.prototype.hasOwnProperty.call(objJSON, 'status')){
                        console.log('%s'.red, objJSON.status);
                    }

                    if(Object.prototype.hasOwnProperty.call(objJSON, 'detail')){
                        console.log('%s'.red, objJSON.detail);
                    }

                    if(Object.prototype.hasOwnProperty.call(objJSON, 'errors')){
                        objJSON.errors.forEach(function(error) {
                            if (error) {
                                console.error('Error reading json response: %O', error);
                            } else {
                            console.log('%s'.red, objJSON.errors[0].error);
                            }
                        });
                    }

                }
            });
        } else {
            console.log('The authentication file [' + authFilename.yellow + '] was not found in either [' + __dirname.yellow + '] or [' + homedir.yellow + '].');
            console.log('Refer to ' + URL_AKA_EDGERC.green + ' for details on configuring your client.');
        }
    } catch(err) {
        console.error(err);
    }
}
