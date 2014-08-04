var exec = require( 'child_process' ).exec;
var fs = require( 'fs' );

exec( 'mkdir -p from/site{a,b,c}/some/long/path{1,2,3}' );
exec( 'touch from/site{a,b,c}/test{a,b,c}.txt' );
exec( 'touch from/site{a,b,c}/some/test{a,b,c}.txt ' );
exec( 'touch from/site{a,b,c}/some/long/test{a,b,c}.txt' );
exec( 'touch from/site{a,b,c}/some/long/path{1,2,3}/test{a,b,c}.txt' );

beforeEach( function(){
	exec( 'rm -r to && mkdir to' );
});

// after( function(){
// 	exec( 'rm -r from to' );
// });

describe( 'Teste de cópias dos arquivos', function(){
	it( 'Deve criar as pastas e copiar apenas um arquivo dentro dela.', function(){
		// copy( 'sitea/testa.txt' );

		if( !fs.existsSync( 'to/sitea/testa.txt' ) ){
			throw( 'Arquivo não existe' );
		}
	});
});