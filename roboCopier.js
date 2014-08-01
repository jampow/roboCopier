var connect = require('./utils/connect.js');
var exec = require( 'child_process' ).exec;

connect.on( 'conectou', function( path ){
	exec( 'cat ~/webmount/noticias/index.htm', function( error, stdout, stderr ){
		console.log( stdout );
		connect.umount( '~/webmount/noticias' );
	});

});

connect.on( 'desconectou', function( path ){
	console.log( 'saiu de ' + path );
});

connect.mount( '~/webmount/noticias' );


