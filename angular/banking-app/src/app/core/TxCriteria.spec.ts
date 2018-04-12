import { TxCriteria } from './TxCriteria';
import * as parse from 'date-fns/parse';

describe( 'TxCriteria: ', () => {
  let criteria: TxCriteria;

  it( 'should create a TxCriteria', () => {
    criteria = new TxCriteria( {} );

    expect( criteria ).toBeDefined();
  } );

  it( 'should take a string as a txDate', () => {
    const inputDate = '2015-01-01';
    criteria = new TxCriteria( { txDate : inputDate } );
    expect( criteria.txDate.toISOString() ).toContain( inputDate );
  } );

  it( 'should take a number as a txDate', () => {
    const inputDate = 1522881263641;
    criteria = new TxCriteria( { txDate : inputDate } );
    expect( criteria.txDate.toISOString() ).toContain( '2018-04-04' );
  } );

  it( 'should render a queryString', () => {
    criteria = new TxCriteria( { cleared : false } );
    expect( criteria.getQueryString() ).toBeDefined();
    expect( criteria.getQueryString() ).toContain( 'cleared' );
  } );

  it( 'should handle most queryString fields', () => {
    criteria = new TxCriteria( {
      amount : 50,
      accountId : 5,
      categoryId : 18
    } );
    const qs = criteria.getQueryString();
    expect( qs ).toBeDefined();
    expect( qs ).toContain( 'amount=50' );
    expect( qs ).toContain( 'accountId=5' );
    expect( qs ).toContain( 'categoryId=18' );
  } );

  it( 'should convert payeeName to payee.payeeName', () => {
    const payeeName = 'Stark Technologies';
    criteria = new TxCriteria( { payeeName } );
    const qs = criteria.getQueryString();
    expect( qs ).toBeDefined();
    expect( qs ).toContain( payeeName );
    expect( qs ).toMatch( /payee\.payeeName/ );
  } );

  it( 'should convert categoryName to category.categoryName', () => {
    const categoryName = 'Medicine';
    criteria = new TxCriteria( { categoryName } );
    const qs = criteria.getQueryString();
    expect( qs ).toBeDefined();
    expect( qs ).toContain( encodeURIComponent( categoryName ) );
    expect( qs ).toMatch( /category\.categoryName/ );
  } );

  it( 'should render a date properly', () => {
    const today = new Date();
    criteria = new TxCriteria( { txDate : today } );
    const qs = criteria.getQueryString();

    expect( qs ).toBeDefined();
    expect( qs ).toEqual( today.toISOString() );
  } );

  it( 'should manage between dates', () => {
    const julyStart = '2016-07-01',
      julyEnd = '2016-07-31';

    criteria = new TxCriteria( {
      txDateBetween : {
        from : parse( julyStart ),
        to : parse( julyEnd )
      }
    } );
    const qs = criteria.getQueryString();
    expect( qs ).toBeTruthy();
    expect( qs ).toContain( julyStart );
    expect( qs ).toContain( julyEnd );
    expect( qs ).not.toContain( '2018' );
  } );

} );
