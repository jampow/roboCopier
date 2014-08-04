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
		self.emit( 'mounted', path );
	});
}

// Desmonta o path recebido por parâmetro
WebDavMount.prototype.umount = function( path ) {
	var self = this;
	console.log( path ? 'desmontando ' + path : 'nome não passado' );

	var interval = setInterval( function(){
		exec( 'umount ' + path, function( error, stdout, stderr ){
			if ( stderr ) {
				console.log( 'ERRO! Tentando desconectar novamente...' );
			} else {
				clearInterval( interval );
				self.emit( 'unmounted', path );
			}
		});
	}, 3000);
}

module.exports = new WebDavMount();