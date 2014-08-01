var exec = require( 'child_process' ).exec;
var events = require( 'events' );
var WebDavMount = function(){ events.EventEmitter.call( this ); };

// extendendo EventEmitter
WebDavMount.super_ = events.EventEmitter;
WebDavMount.prototype = Object.create( events.EventEmitter.prototype, {
	constructor: {
		value: WebDavMount,
		enumerable: false
	}
});

// Monta o path recebido por parâmetro
WebDavMount.prototype.mount = function( path ) {
	var self = this;
	console.log( 'conectando a ' + path );
	exec( 'mount ' + path, function( error, stdout, stderr ){
		console.log( '----------------------------------error----------------------------------' );
		console.log( error );
		console.log( '----------------------------------stdout----------------------------------' );
		console.log( stdout );
		console.log( '----------------------------------stderr----------------------------------' );
		console.log( stderr );

		self.emit( 'conectou', path );
	});
}

// Desmonta o path recebido por parâmetro
WebDavMount.prototype.umount = function( path ) {
	var self = this;
	self.connected = true;
	console.log( path ? 'desmontando ' + path : 'nome não passado' );
	while( self.connected ){
		exec( 'umount ' + path, function( error, stdout, stderr ){
			if ( error ) {
				console.log( 'ERRO! Tentando desconectar novamente' );
				// console.log( error );
			} else {
				self.connected = false;
				self.emit( 'desconectou', path );
			}
		});
	}
}

module.exports = new WebDavMount();