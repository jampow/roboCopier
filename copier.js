var events = require( 'events' );
var Copier = function(){ events.EventEmitter.call( this ); };

// extendendo EventEmitter
Copier.super_ = events.EventEmitter;
Copier.prototype = Object.create( events.EventEmitter.prototype, {
	constructor: {
		value: Copier,
		enumerable: false
	}
});

module.exports = new Copier();