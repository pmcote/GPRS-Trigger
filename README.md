##Tessel GPRS Trigger  
This module lets you use your Tessel's GPRS module to make other Tessel modules do things. This essentially means that you can text your Tessel and have it execute a function using any module. 

```js
var tessel = require('tessel');
var gprslib = require('gprs-sim900');
var relaylib = require('relay-mono');
var gprs = gprslib.use(tessel.port['A']);
var relay = relaylib.use(tessel.port['A']);

var triggerFunction = require('gprs-trigger');
var triggerFunc = new triggerFunction;

var trigger = 'boop';

// The cool thing you want your triggered module to do. In this case, turn something on or off with the relay module.
function coolAction () {
    relay.toggle(1, function (err) {
    if (err) return console.err() 
    if (LOGS) console.log('toggled');
    });
};

// Initialize GPRS module
gprs.on('ready', function() {
    // Wait around 30 seconds for the GPRS modual to connect before sending Tessel a text.
    console.log("GPRS is on and waiting for you to text a trigger for your module");
    triggerFunc.triggerFunc(gprs, trigger, coolAction);
});
```