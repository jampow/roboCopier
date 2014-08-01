var WebDavMount = function(){};
var exec = require( 'child_process' ).exec;

WebDavMount.prototype.mount = function( path ) {
	console.log( 'conectando a ' + path );
	exec( 'mount ' + path, function( error, stdout, stderr ){
		console.log( error );
		console.log( stdout );
		console.log( stderr );
	});
}

WebDavMount.prototype.umount = function( path ) {
	console.log( path ? 'desmontando ' + path : 'nome não passado' );
	exec( 'umount ' + path, function( error, stdout, stderr ){
		console.log( error );
		console.log( stdout );
		console.log( stderr );
	});
}

module.exports = new WebDavMount();