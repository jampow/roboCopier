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
	var error = null;

	self.prepareDestinationPath( to );

	fse.copy( from, to, function( err ){
		if ( err ) {
			self.emit( 'copyError', err );
			error = err;
		} else {
			self.emit( 'copySuccess', { "from": from, "to": to });
		}
	});

	if ( callback ) callback( error );
};

Copier.prototype.copyFileRecursive = function( from, to, force ){
	var self = this;

	var force = force || false;

	var foldersFrom = from.split( path.sep );
	var fileFrom = foldersFrom.pop();

	var foldersTo = to.split( path.sep );
	var fileTo = foldersTo.pop();

	var sizeFrom = foldersFrom.length;

	var errors = [];
	var success = [];

	var i = foldersFrom.length - 1;
	var j = foldersTo.length - 1;

	for (; i-- && j--;) {
		filePathFrom =  path.join( foldersFrom.join( path.sep ), fileFrom );
		filePathTo =  path.join( foldersTo.join( path.sep ), fileTo );

		if ( fse.existsSync( filePathFrom ) ){
			self.copyFile( filePathFrom, filePathTo, function( err ){
				if ( err ) errors.push( err );
			});

			if ( !force ) return;
		}

		foldersFrom.pop();
		foldersTo.pop();
	}

	if ( errors.length > 0 )
		self.emit( 'recursiveCopyError', { 'errors': errors, 'success': success } );
	else
		self.emit( 'recursiveCopySuccess', success );
};

module.exports = new Copier();