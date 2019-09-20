module.exports = {
    helpScreen: function () {
        // Platform independent end-of-line character
        var endOfLine = require('os').EOL;
        // console colours
        // eslint-disable-next-line no-unused-vars
        const colours = require('colors');
        // parse package.json for the version number
        const package = require('./package.json');

        // Display help screen
        console.log('%s [a.k.a %s]'.cyan, package.name, Object.keys(package.bin)[0]);
        console.log('Read the docs: '.green + package.homepage);
        console.log('Support & bugs: '.magenta + package.bugs.url);
        console.log(endOfLine);
        console.log('%s'.italic, package.description);
        //console.log(endOfLine);
        console.log('VERSION:'.grey);
        console.log('   ' + package.version);
        console.log(endOfLine);
        console.log('USAGE:'.grey);
        console.log('   ' + 'hashref errorReference [options]');
        console.log(endOfLine);
        console.log('OPTIONS:'.grey);
        console.log('   ' + 'errorReference                   ' + 'The Akamai Error Reference number to lookup'.grey);
        console.log('   ' + '--decode <true|false>            ' + 'Enable or disable decoding of URLs and user-agent [true]'.grey);
        console.log('   ' + '--no-color                       ' + 'Switches off colour output'.grey);
        console.log('   ' + '--version                        ' + 'Display version number'.grey);
        console.log('   ' + '--help                           ' + 'Display this help'.grey);
        console.log(endOfLine);
        console.log('EXAMPLES:'.grey);
        console.log('   hashref 18.2d351ab8.1557333295.a4e16ab');
        console.log('   hashref 18.2d351ab8.1557333295.a4e16ab --decode false');
    }
  };
