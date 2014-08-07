var events = require( 'events' );
var fse = require( 'fs-extra' );
var path = require( 'path' );
var Copier = function(){ events.EventEmitter.call( this ); };

// extendendo EventEmitter
Copier.super_ = events.EventEmitter;
Copier.prototype = Object.create( events.EventEmitter.prototype, {
	constructor: {
		value: Copier,
		enumerable: false
	}
});

Copier.prototype.validateParentPath = function( filePath ){
	fse.exists( path.dirname( filePath ), function( exists ){
		return exists ? true : false;
	});
};

Copier.prototype.prepareDestinationPath = function( filePath ){
	var self = this;

	if( !self.validateParentPath( filePath ) )
		fse.mkdirsSync( path.dirname( filePath ) );
}

Copier.prototype.copyFile = function( from, to, callback ){
	var self = this;

	self.prepareDestinationPath( to );

	fse.copy( from, to, function( err ){
		if ( err )
			self.emit( 'copyError', err );
		else
			self.emit( 'copySuccess', { "from": from, "to": to });

		if ( callback ) callback( err, from, to );
	})
};

module.exports = new Copier();