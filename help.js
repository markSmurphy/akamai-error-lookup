module.exports = {
    helpScreen: function () {
        // Platform independent end-of-line character
        var endOfLine = require('os').EOL;
        // console colours
        // eslint-disable-next-line no-unused-vars
        const colours = require('colors');
        // parse package.json for the version number
        const package = require('./package.json');

        //display help screen
        console.log('akamai-error-lookup [a.k.a hashref]'.cyan);
        console.log('Read the docs: '.green + 'https://github.com/MarkSMurphy/akamai-error-lookup#readme');
        console.log('Support & bugs: '.magenta + 'https://github.com/MarkSMurphy/akamai-error-lookup/issues');
        console.log(endOfLine);
        console.log('Retrieves diagnostic details of Akamai error reference numbers via Akamai\'s API'.italic);
        console.log(endOfLine);
        console.log('VERSION:'.grey);
        console.log('   ' + package.version);
        console.log(endOfLine);
        console.log('USAGE:'.grey);
        console.log('   ' + 'hashref [errorReference]                 ' + 'Retrieve diagnostic details for the specified errorReference.'.grey);
        console.log('   ' + 'hashref --version                        ' + 'Display version number.'.grey);
        console.log('   ' + 'hashref --help                           ' + 'Display this help.'.grey);
        console.log(endOfLine);
        console.log('EXAMPLE:'.grey);
        console.log('   hashref 18.2d351ab8.1557333295.a4e16ab');
    }
  };
