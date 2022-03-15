// example error number
// 1.c4d3dead.1557825244.905cd4

// console.log() colours
const colours = require('colors'); // eslint-disable-line no-unused-vars

// Get O/S specific End Of Line character
const EOL = require('os').EOL;

// Fake sanitised output
const urlPath = '/diagnostic-tools/v2/errors/' + process.argv[2] + '/translated-error';
console.log('sending request to ' + urlPath.yellow);

const tickCount = Date.now();
var difference = 0;
while (difference < 5000) {
    difference = Date.now() - tickCount;
}
console.log('Received a response in 5 seconds');

console.log(EOL);
console.log('The origin server IP address could not be resolved from the origin hostname.'.red);
console.log('ERR_DNS_FAIL|Name_Error'.red);
console.log(EOL);

console.log('URL:'.yellow);
console.log('https://example.com/test/error');

console.log('Method:'.yellow);
console.log('GET');

console.log('Response Code:'.yellow);
console.log('503'.red);

console.log('Origin Hostname:'.yellow);
console.log('origin.example.com');

console.log('Origin IP Address:'.yellow);
console.log('');

console.log('User-agent:'.yellow);
console.log('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:67.0) Gecko/20100101 Firefox/67.0');

console.log('Client IP Address:'.yellow);
console.log('10.1.1.1 (SPRINGFIELD, EN, GB)');

console.log('Timestamp:'.yellow);
console.log('Mon, May 26, 2019 11:11 GMT');

console.log('Web Application Firewall [WAF] Details:'.yellow);
console.log('MwNP_24574||');

console.log(EOL);
console.log('writing full response to [C:\\Users\\dev\\AppData\\Local\\Temp\\' + process.argv[2] + '.json]');
