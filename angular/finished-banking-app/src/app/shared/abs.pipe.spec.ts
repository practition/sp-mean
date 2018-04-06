import { AbsPipe } from './abs.pipe';

describe( 'AbsPipe', () => {
  let pipe: AbsPipe;

  beforeEach( () => {
    pipe = new AbsPipe();
  } );

  it( 'create an instance', () => {
    expect( pipe ).toBeTruthy();
  } );

  it( 'should return the absolute value of a number', () => {
    expect( pipe.transform( -5 ) ).toBe( 5 );
    expect( pipe.transform( 5 ) ).toBe( 5 );
    expect( pipe.transform( 0 ) ).toBe( 0 );
    expect( pipe.transform( '456' ) ).toBe( 456 );
    expect( pipe.transform( '456.789' ) ).toBe( 456.789 );
    expect( pipe.transform( '456e+03' ) ).toBe( 456000 );
  } );

  it( 'should return non-numbers', () => {
    expect( pipe.transform( 'abc' ) ).toBe( 'abc' );
    expect( pipe.transform( '123abc' ) ).toBe( '123abc' );
  } );
} );
