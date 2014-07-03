var util = require('util');
var EventEmitter = require('events').EventEmitter;

function triggerFunction () {
	EventEmitter.call(this);
}

util.inherits(triggerFunction, EventEmitter);


triggerFunction.prototype.triggerFunc = function (gprs, trigger, callback) {
	/*
		args: 
		gprs - your gprs module that you want to use to trigger other modules.

		trigger - A string that you will use to trigger an action

		to-do:multiple triggers
	*/
	console.log('debug')
	LOGS = true; // true makes the function verbose, false quiets the function

	var trig = new EventEmitter(); // Sets up an EventEmitter object for triggers

	// Emit unsolicited messages beginning with. . .
	gprs.emitMe(['+']);

	// When receiving an unsolicited text, read it and print it to console
	gprs.on('+', function messageNotify (data) {
		console.log('debug1')
		var dataSplit = data.split(','); // Splits the data so we can get SMSindex
		var SMSindex = dataSplit[1];
		var mode = 0; // Zero marks message as read, One will not change message status

		gprs.readSMS(SMSindex, 1, function (err, message) {
			console.log('debug2')
			if (err) {
				return console.err();
			};

			sendingInfo = message[1] 
			// Message is an array with index 0: Command echo, 1: Message information (read state, soure number, date), 2: Message text, 3; 'OK' if successful
			if (LOGS) console.log('Message received!\nMessage from number: ', sendingInfo[1]);
			if (LOGS) console.log('Message to Tessel: ', message[2]);

			// Now we're going to set a trigger for the next module action
			var trigger_code = new RegExp(trigger);
			var isTrigger = trigger_code.test(message[2]);

			if (isTrigger) {
				console.log('debug3')
				if (LOGS) console.log('We can tell a module what to do');
				// Emits trigger events that other functions can listen for
				trig.emit('triggered');
			}
			else {
				if (LOGS) console.log('That was not the trigger you set, but congrats on having such a popular Tessel.');
			}
		});
	});

	
	trig.on('triggered', callback);
};

module.exports = triggerFunction;
