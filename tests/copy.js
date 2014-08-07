var exec = require( 'child_process' ).exec;
var fs = require( 'fs' );
var copier = require( '../copier.js' );
var should = require( 'should' );
var assert = require( 'assert');

// exec( 'mkdir -p from/site{a,b,c}/some/long/path{1,2,3}' );
// exec( 'touch from/site{a,b,c}/test{a,b,c}.txt' );
// exec( 'touch from/site{a,b,c}/some/test{a,b,c}.txt ' );
// exec( 'touch from/site{a,b,c}/some/long/test{a,b,c}.txt' );
// exec( 'touch from/site{a,b,c}/some/long/path{1,2,3}/test{a,b,c}.txt' );

exec( 'mkdir -p from/sitea/some/long/path1 from/sitea/some/long/path2 from/sitea/some/long/path3 from/siteb/some/long/path1 from/siteb/some/long/path2 from/siteb/some/long/path3 from/sitec/some/long/path1 from/sitec/some/long/path2 from/sitec/some/long/path3' );
exec( 'touch from/sitea/testa.txt from/sitea/testb.txt from/sitea/testc.txt from/siteb/testa.txt from/siteb/testb.txt from/siteb/testc.txt from/sitec/testa.txt from/sitec/testb.txt from/sitec/testc.txt' );
exec( 'touch from/sitea/some/testa.txt from/sitea/some/testb.txt from/sitea/some/testc.txt from/siteb/some/testa.txt from/siteb/some/testb.txt from/siteb/some/testc.txt from/sitec/some/testa.txt from/sitec/some/testb.txt from/sitec/some/testc.txt' );
exec( 'touch from/sitea/some/long/testa.txt from/sitea/some/long/testb.txt from/sitea/some/long/testc.txt from/siteb/some/long/testa.txt from/siteb/some/long/testb.txt from/siteb/some/long/testc.txt from/sitec/some/long/testa.txt from/sitec/some/long/testb.txt from/sitec/some/long/testc.txt' );
exec( 'touch from/sitea/some/long/path1/testa.txt from/sitea/some/long/path1/testb.txt from/sitea/some/long/path1/testc.txt from/sitea/some/long/path2/testa.txt from/sitea/some/long/path2/testb.txt from/sitea/some/long/path2/testc.txt from/sitea/some/long/path3/testa.txt from/sitea/some/long/path3/testb.txt from/sitea/some/long/path3/testc.txt from/siteb/some/long/path1/testa.txt from/siteb/some/long/path1/testb.txt from/siteb/some/long/path1/testc.txt from/siteb/some/long/path2/testa.txt from/siteb/some/long/path2/testb.txt from/siteb/some/long/path2/testc.txt from/siteb/some/long/path3/testa.txt from/siteb/some/long/path3/testb.txt from/siteb/some/long/path3/testc.txt from/sitec/some/long/path1/testa.txt from/sitec/some/long/path1/testb.txt from/sitec/some/long/path1/testc.txt from/sitec/some/long/path2/testa.txt from/sitec/some/long/path2/testb.txt from/sitec/some/long/path2/testc.txt from/sitec/some/long/path3/testa.txt from/sitec/some/long/path3/testb.txt from/sitec/some/long/path3/testc.txt' );

beforeEach( function(){
	exec( 'rm -r to && mkdir to' );
});

after( function(){
	exec( 'rm -r from to' );
});


describe( 'Teste de cópias dos arquivos', function(){
	describe( 'Copier module', function(){

		it( 'Deve criar as pastas e copiar apenas um arquivo dentro dela.', function( done ){
			copier.removeAllListeners( 'copySuccess' );
			copier.removeAllListeners( 'copyError' );

			copier.on( 'copySuccess',function( data ){
				if( !fs.existsSync( '/home/gsoares' ) ){
					throw( 'Arquivo não existe' );
				}
				done();
			});

			copier.on( 'copyError',function( data ){
				throw( 'Erro ao copiar o arquivo' );
				done();
			});

			copier.copyFile( 'from/sitea/testa.txt', 'to/sitea/testa.txt' );

		});

		it( 'Deve criar as pastas e copiar uma pasta e todo o seu conteúdo do original para o destino', function( done ){
			copier.removeAllListeners( 'copySuccess' );
			copier.removeAllListeners( 'copyError' );

			copier.on( 'copySuccess',function( data ){
				var files = [ 'a', 'b', 'c' ];

				for (var i = files.length - 1; i >= 0; i--) {
					if( !fs.existsSync( data.to + '/test' + files[i] + '.txt' ) ){
						throw new assert.AssertionError({
							message: 'Arquivo não existe'
						});
					}
				}

				done();
			});

			copier.on( 'copyError',function( data ){
				throw( 'Erro ao copiar o arquivo' );
				done();
			});

			copier.copyFile( 'from/sitea/some/long/path1', 'to/sitea/some/long/path1' );
		});
	});
});