// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/**********************************************
This npm module allows you to use Tessel's GPRS
module to trigger other modules on your Tessel.
An example would be texting a tessel 'relay' to
turn the relay module on and off.
***********************************************/

var tessel = require('tessel');
var gprslib = require('gprs-sim900');
var triggerFunction = require('./');
var triggerFunc = new triggerFunction;

var gprs = gprslib.use(tessel.port['A']);

var trigger = 'boop';

// The cool thing you want your triggered module to do. In this case, turn something on or off with the relay module.
function coolAction () {
	console.log('do the cool thing')
};

// Initialize GPRS module
gprs.on('ready', function() {
	// Wait around 30 seconds for the GPRS modual to connect before sending Tessel a text.
	console.log("GPRS is on and waiting for you to text a trigger for your module");
	triggerFunc.triggerFunc(gprs, trigger, coolAction);
});