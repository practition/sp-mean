import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TransactionsDaoService } from './transactions-dao.service';
import { Transaction } from '../transactions/Transaction';
import { TxCriteria } from './TxCriteria';

describe( 'TransactionsDaoService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let dao: TransactionsDaoService;

  beforeEach( () => {
    TestBed.configureTestingModule( {
      imports : [ HttpClientTestingModule ],
      providers : [ TransactionsDaoService ]
    } );

    httpClient = TestBed.get( HttpClient );
    httpTestingController = TestBed.get( HttpTestingController );

    dao = TestBed.get( TransactionsDaoService );
  } );

  it( 'should return the last transaction', () => {
    const results: Transaction[] = [ new Transaction( getTestData()[ 0 ] ) ];
    dao.getLastTransaction()
      .subscribe( tx => {
        expect( tx.id ).toEqual( results[ 0 ].id );
        expect( tx.version ).toEqual( results[ 0 ].version );
        expect( tx ).toEqual( results[ 0 ] );
      } );

    const req = httpTestingController.expectOne( `${dao.baseUrl}?${dao.params.getLastTransaction}` );

    expect( req.request.method ).toEqual( 'GET' );
    req.flush( results );
    httpTestingController.verify();
  } );

  describe( 'query()', () => {
    let results: Transaction[];
    let criteria: TxCriteria;

    beforeEach( () => {
      results = getTestData().map( tx => new Transaction( tx ) );
    } );

    it( 'should run a basic query()', () => {
      const payeeId = '19';
      criteria = new TxCriteria( { payeeId } );
      results = results.filter( tx => tx.payeeId === payeeId );

      dao.query( criteria )
        .subscribe( ( txs: Transaction[] ) => {
          expect( txs ).toEqual( results );
        } );

      const req = httpTestingController.expectOne( match => match.url.includes( 'payeeId' ) );
      req.flush( results );
    } );

    it( 'should handle an error', () => {
      const msg = 'Deliberate 404 error';
      const payeeId = '1974';
      criteria = new TxCriteria( { payeeId } );

      dao.query( criteria )
        .subscribe( txs => fail( 'should have failed with a 404' ),
          error  => {
            expect( error ).toContain( 'DAO issues' );
          } );

      const req = httpTestingController.expectOne( match => match.url.includes( 'payeeId' ) );
      req.flush( msg, {
        status : 404,
        statusText : 'Not found'
      } );
    } );
  } );

  describe( 'cleared tx', () => {
    let results: Transaction[];

    beforeEach( () => {
      results = getTestData()
        .map( tx => new Transaction( tx ) )
        .filter( tx => !tx.cleared );
    } );

    it( 'should find the transactions which are not cleared', () => {
      dao.getNotCleared()
        .subscribe( ( txs: Transaction[] ) => {
          expect( txs.some( tx => tx.cleared ) ).toBeFalsy();
          expect<Transaction[]>( txs ).toEqual( results );
        } );

      const req = httpTestingController.expectOne( match => match.url.includes( 'cleared' ) );
      req.flush( results );
    } );

    it( 'should count the not-cleared transactions', () => {
      dao.getNotClearedCount()
        .subscribe( ( count: number ) => expect<number>( count ).toBe( results.length ) );
    } );
  } );
} );

function getTestData() {
  return [
    {
      'id' : '1496',
      'payeeId' : '19',
      'personId' : '210',
      'categoryId' : '107',
      'category' : {
        'id' : '107',
        'categoryName' : 'Transportation',
        'categoryType' : 'expense'
      },
      'accountId' : '15',
      'txTypeId' : '2',
      'txDate' : '2016-10-02T22:46:00.000Z',
      'version' : 1,
      'cleared' : true,
      'amount' : -3.75,
      'txType' : {
        'id' : '2',
        'typeName' : 'Debit'
      },
      'person' : {
        'firstName' : 'Ambrose',
        'lastName' : 'Chase',
        'gender' : 'male',
        'dateOfBirth' : '1993-10-22',
        'id' : '210',
        'version' : 1,
        'address' : {
          'street' : '4767 Ibrahim Overpass',
          'city' : 'Portsmouth',
          'state' : 'RI',
          'zip' : '24622'
        }
      },
      'payee' : {
        'id' : '19',
        'payeeName' : 'Wayne Enterprises',
        'categoryId' : '107',
        'address' : '319 Thomas Wayne Road',
        'city' : 'Gotham',
        'state' : 'NY',
        'zip' : '10939',
        'image' : '/images/technics/1.jpg',
        'motto' : 'Persevering regional moratorium',
        'version' : 1,
        'active' : true
      }
    },
    {
      'id' : '1165',
      'payeeId' : '24',
      'personId' : '207',
      'categoryId' : '101',
      'category' : {
        'id' : '101',
        'categoryName' : 'Clothing',
        'categoryType' : 'expense'
      },
      'accountId' : '12',
      'txTypeId' : '2',
      'txDate' : '2016-10-02T22:32:00.000Z',
      'version' : 1,
      'cleared' : true,
      'amount' : -63.25,
      'txType' : {
        'id' : '2',
        'typeName' : 'Debit'
      },
      'person' : {
        'firstName' : 'Spider',
        'lastName' : 'Jerusalem',
        'gender' : 'male',
        'dateOfBirth' : '1977-07-05',
        'id' : '207',
        'version' : 1,
        'address' : {
          'street' : '282 Queenie Drives',
          'city' : 'Hesselview',
          'state' : 'AL',
          'zip' : '04221'
        }
      },
      'payee' : {
        'id' : '24',
        'payeeName' : 'Rodriguez Outfitting',
        'categoryId' : '101',
        'address' : '587 Ipobak Terrace',
        'city' : 'Alexandria',
        'state' : 'VA',
        'zip' : '16097',
        'image' : '/images/nature/6.jpg',
        'motto' : 'Operative maximized matrices',
        'version' : 1,
        'active' : true
      }
    },
    {
      'id' : '298',
      'payeeId' : '9',
      'personId' : '202',
      'categoryId' : '107',
      'category' : {
        'id' : '107',
        'categoryName' : 'Transportation',
        'categoryType' : 'expense'
      },
      'accountId' : '3',
      'txTypeId' : '2',
      'txDate' : '2016-10-02T20:33:00.000Z',
      'version' : 1,
      'cleared' : true,
      'amount' : -12,
      'txType' : {
        'id' : '2',
        'typeName' : 'Debit'
      },
      'person' : {
        'firstName' : 'Lucas',
        'lastName' : 'Trent',
        'gender' : 'male',
        'dateOfBirth' : '1983-02-12',
        'id' : '202',
        'version' : 1,
        'address' : {
          'street' : '8966 Telly Tunnel',
          'city' : 'Rickashire',
          'state' : 'OR',
          'zip' : '90822-8587'
        }
      },
      'payee' : {
        'id' : '9',
        'payeeName' : 'Gleichner, Lind and Olson, Ltd.',
        'categoryId' : '107',
        'address' : '142 Wune Street',
        'city' : 'Deetelu',
        'state' : 'WV',
        'zip' : '80587',
        'image' : '/images/animals/9.jpg',
        'motto' : 'Optimized executive frame',
        'version' : 1,
        'active' : true
      }
    },
    {
      'id' : '999',
      'payeeId' : '7',
      'personId' : '206',
      'categoryId' : '104',
      'category' : {
        'id' : '104',
        'categoryName' : 'Entertainment',
        'categoryType' : 'expense'
      },
      'accountId' : '10',
      'txTypeId' : '2',
      'txDate' : '2016-10-02T20:28:00.000Z',
      'version' : 1,
      'cleared' : false,
      'amount' : -4.5,
      'txType' : {
        'id' : '2',
        'typeName' : 'Debit'
      },
      'person' : {
        'firstName' : 'Shen',
        'lastName' : 'Li-Min',
        'gender' : 'female',
        'dateOfBirth' : '1990-06-30',
        'id' : '206',
        'version' : 1,
        'address' : {
          'street' : '293 Muller Street',
          'city' : 'Leffler',
          'state' : 'VT',
          'zip' : '33861-2679'
        }
      },
      'payee' : {
        'id' : '7',
        'payeeName' : 'Worthless Peon Productions',
        'address' : '125 Scrub Street',
        'city' : 'Santa Monica',
        'state' : 'CA',
        'zip' : '90111',
        'categoryId' : '104',
        'image' : null,
        'motto' : null,
        'version' : 1,
        'active' : true
      }
    },
    {
      'id' : '800',
      'payeeId' : '25',
      'personId' : '205',
      'categoryId' : '101',
      'category' : {
        'id' : '101',
        'categoryName' : 'Clothing',
        'categoryType' : 'expense'
      },
      'accountId' : '8',
      'txTypeId' : '2',
      'txDate' : '2016-10-02T19:07:00.000Z',
      'version' : 1,
      'cleared' : true,
      'amount' : -46,
      'txType' : {
        'id' : '2',
        'typeName' : 'Debit'
      },
      'person' : {
        'firstName' : 'Angela',
        'lastName' : 'Cortez',
        'gender' : 'female',
        'dateOfBirth' : '1979-05-15',
        'id' : '205',
        'version' : 1,
        'address' : {
          'street' : '0546 Baumbach Street',
          'city' : 'Garrison',
          'state' : 'AK',
          'zip' : '27323-2569'
        }
      },
      'payee' : {
        'id' : '25',
        'payeeName' : 'Tower Shields',
        'categoryId' : '101',
        'address' : '289 Vaewi Avenue',
        'city' : 'Dorkachek',
        'state' : 'WY',
        'zip' : '19966',
        'image' : '/images/business/5.jpg',
        'motto' : 'Streamlined full-range budgetary management',
        'version' : 1,
        'active' : true
      }
    },
    {
      'id' : '1501',
      'payeeId' : '25',
      'personId' : '210',
      'categoryId' : '101',
      'category' : {
        'id' : '101',
        'categoryName' : 'Clothing',
        'categoryType' : 'expense'
      },
      'accountId' : '15',
      'txTypeId' : '2',
      'txDate' : '2016-10-02T18:53:00.000Z',
      'version' : 1,
      'cleared' : true,
      'amount' : -46,
      'txType' : {
        'id' : '2',
        'typeName' : 'Debit'
      },
      'person' : {
        'firstName' : 'Ambrose',
        'lastName' : 'Chase',
        'gender' : 'male',
        'dateOfBirth' : '1993-10-22',
        'id' : '210',
        'version' : 1,
        'address' : {
          'street' : '4767 Ibrahim Overpass',
          'city' : 'Portsmouth',
          'state' : 'RI',
          'zip' : '24622'
        }
      },
      'payee' : {
        'id' : '25',
        'payeeName' : 'Tower Shields',
        'categoryId' : '101',
        'address' : '289 Vaewi Avenue',
        'city' : 'Dorkachek',
        'state' : 'WY',
        'zip' : '19966',
        'image' : '/images/business/5.jpg',
        'motto' : 'Streamlined full-range budgetary management',
        'version' : 1,
        'active' : true
      }
    },
    {
      'id' : '1340',
      'payeeId' : '15',
      'personId' : '208',
      'categoryId' : '103',
      'category' : {
        'id' : '103',
        'categoryName' : 'Food',
        'categoryType' : 'expense'
      },
      'accountId' : '13',
      'txTypeId' : '2',
      'txDate' : '2016-10-02T18:24:00.000Z',
      'version' : 1,
      'cleared' : true,
      'amount' : -40.25,
      'txType' : {
        'id' : '2',
        'typeName' : 'Debit'
      },
      'person' : {
        'firstName' : 'Jakita',
        'lastName' : 'Wagner',
        'gender' : 'female',
        'dateOfBirth' : '1988-08-12',
        'id' : '208',
        'version' : 1,
        'address' : {
          'street' : '46892 Virgil Hill',
          'city' : 'Quantico',
          'state' : 'VA',
          'zip' : '68699'
        }
      },
      'payee' : {
        'id' : '15',
        'payeeName' : 'Heathcote Inc',
        'address' : '798 Defarge Point',
        'city' : 'Tajuwbi',
        'state' : 'WI',
        'zip' : '88464',
        'categoryId' : '103',
        'image' : '/images/business/3.jpg',
        'motto' : 'Secured web-enabled Graphical Clothing Interface',
        'version' : 1,
        'active' : true
      }
    },
    {
      'id' : '1144',
      'payeeId' : '9',
      'personId' : '207',
      'categoryId' : '107',
      'category' : {
        'id' : '107',
        'categoryName' : 'Transportation',
        'categoryType' : 'expense'
      },
      'accountId' : '12',
      'txTypeId' : '2',
      'txDate' : '2016-10-02T17:24:00.000Z',
      'version' : 1,
      'cleared' : true,
      'amount' : -12,
      'txType' : {
        'id' : '2',
        'typeName' : 'Debit'
      },
      'person' : {
        'firstName' : 'Spider',
        'lastName' : 'Jerusalem',
        'gender' : 'male',
        'dateOfBirth' : '1977-07-05',
        'id' : '207',
        'version' : 1,
        'address' : {
          'street' : '282 Queenie Drives',
          'city' : 'Hesselview',
          'state' : 'AL',
          'zip' : '04221'
        }
      },
      'payee' : {
        'id' : '9',
        'payeeName' : 'Gleichner, Lind and Olson, Ltd.',
        'categoryId' : '107',
        'address' : '142 Wune Street',
        'city' : 'Deetelu',
        'state' : 'WV',
        'zip' : '80587',
        'image' : '/images/animals/9.jpg',
        'motto' : 'Optimized executive frame',
        'version' : 1,
        'active' : true
      }
    },
    {
      'id' : '1303',
      'payeeId' : '10',
      'personId' : '208',
      'categoryId' : '107',
      'category' : {
        'id' : '107',
        'categoryName' : 'Transportation',
        'categoryType' : 'expense'
      },
      'accountId' : '13',
      'txTypeId' : '2',
      'txDate' : '2016-10-02T17:11:00.000Z',
      'version' : 1,
      'cleared' : true,
      'amount' : -16.5,
      'txType' : {
        'id' : '2',
        'typeName' : 'Debit'
      },
      'person' : {
        'firstName' : 'Jakita',
        'lastName' : 'Wagner',
        'gender' : 'female',
        'dateOfBirth' : '1988-08-12',
        'id' : '208',
        'version' : 1,
        'address' : {
          'street' : '46892 Virgil Hill',
          'city' : 'Quantico',
          'state' : 'VA',
          'zip' : '68699'
        }
      },
      'payee' : {
        'id' : '10',
        'payeeName' : 'Klein Cars',
        'address' : '1939 Rolfs Pass',
        'city' : 'Baltimore',
        'state' : 'MD',
        'zip' : '97394',
        'categoryId' : '107',
        'image' : '/images/technics/4.jpg',
        'motto' : 'Seamless heuristic process improvement',
        'version' : 1,
        'active' : true
      }
    },
    {
      'id' : '627',
      'payeeId' : '24',
      'personId' : '204',
      'categoryId' : '101',
      'category' : {
        'id' : '101',
        'categoryName' : 'Clothing',
        'categoryType' : 'expense'
      },
      'accountId' : '6',
      'txTypeId' : '2',
      'txDate' : '2016-10-02T16:36:00.000Z',
      'version' : 1,
      'cleared' : true,
      'amount' : -8.25,
      'txType' : {
        'id' : '2',
        'typeName' : 'Debit'
      },
      'person' : {
        'firstName' : 'Jeroen',
        'lastName' : 'Thornedike',
        'gender' : 'male',
        'dateOfBirth' : '1984-04-07',
        'id' : '204',
        'version' : 1,
        'address' : {
          'street' : '851 Matt Station',
          'city' : 'Ovorp',
          'state' : 'UT',
          'zip' : '69781-5546'
        }
      },
      'payee' : {
        'id' : '24',
        'payeeName' : 'Rodriguez Outfitting',
        'categoryId' : '101',
        'address' : '587 Ipobak Terrace',
        'city' : 'Alexandria',
        'state' : 'VA',
        'zip' : '16097',
        'image' : '/images/nature/6.jpg',
        'motto' : 'Operative maximized matrices',
        'version' : 1,
        'active' : true
      }
    },
    {
      'id' : '1328',
      'payeeId' : '24',
      'personId' : '208',
      'categoryId' : '101',
      'category' : {
        'id' : '101',
        'categoryName' : 'Clothing',
        'categoryType' : 'expense'
      },
      'accountId' : '13',
      'txTypeId' : '2',
      'txDate' : '2016-10-01T23:53:00.000Z',
      'version' : 1,
      'cleared' : true,
      'amount' : -63.25,
      'txType' : {
        'id' : '2',
        'typeName' : 'Debit'
      },
      'person' : {
        'firstName' : 'Jakita',
        'lastName' : 'Wagner',
        'gender' : 'female',
        'dateOfBirth' : '1988-08-12',
        'id' : '208',
        'version' : 1,
        'address' : {
          'street' : '46892 Virgil Hill',
          'city' : 'Quantico',
          'state' : 'VA',
          'zip' : '68699'
        }
      },
      'payee' : {
        'id' : '24',
        'payeeName' : 'Rodriguez Outfitting',
        'categoryId' : '101',
        'address' : '587 Ipobak Terrace',
        'city' : 'Alexandria',
        'state' : 'VA',
        'zip' : '16097',
        'image' : '/images/nature/6.jpg',
        'motto' : 'Operative maximized matrices',
        'version' : 1,
        'active' : true
      }
    },
    {
      'id' : '492',
      'payeeId' : '5',
      'personId' : '203',
      'categoryId' : '103',
      'category' : {
        'id' : '103',
        'categoryName' : 'Food',
        'categoryType' : 'expense'
      },
      'accountId' : '5',
      'txTypeId' : '2',
      'txDate' : '2016-10-01T23:15:00.000Z',
      'version' : 1,
      'cleared' : true,
      'amount' : -143.75,
      'txType' : {
        'id' : '2',
        'typeName' : 'Debit'
      },
      'person' : {
        'firstName' : 'Jack',
        'lastName' : 'Hawksmoor',
        'gender' : 'male',
        'dateOfBirth' : '1974-03-26',
        'id' : '203',
        'version' : 1,
        'address' : {
          'street' : '86853 Donnelly Circle',
          'city' : 'Annester',
          'state' : 'IA',
          'zip' : '42783'
        }
      },
      'payee' : {
        'id' : '5',
        'payeeName' : 'Shop-Rite Grocery Store',
        'address' : '311 St. Paul Ave.',
        'city' : 'Baltimore',
        'state' : 'MD',
        'zip' : '08697',
        'categoryId' : '103',
        'image' : null,
        'motto' : null,
        'version' : 1,
        'active' : true
      }
    },
    {
      'id' : '317',
      'payeeId' : '18',
      'personId' : '202',
      'categoryId' : '102',
      'category' : {
        'id' : '102',
        'categoryName' : 'Housing',
        'categoryType' : 'expense'
      },
      'accountId' : '3',
      'txTypeId' : '2',
      'txDate' : '2016-10-01T22:56:00.000Z',
      'version' : 1,
      'cleared' : true,
      'amount' : -45,
      'txType' : {
        'id' : '2',
        'typeName' : 'Debit'
      },
      'person' : {
        'firstName' : 'Lucas',
        'lastName' : 'Trent',
        'gender' : 'male',
        'dateOfBirth' : '1983-02-12',
        'id' : '202',
        'version' : 1,
        'address' : {
          'street' : '8966 Telly Tunnel',
          'city' : 'Rickashire',
          'state' : 'OR',
          'zip' : '90822-8587'
        }
      },
      'payee' : {
        'id' : '18',
        'payeeName' : 'Watsica Design',
        'address' : '289 Vaewi Avenue',
        'city' : 'Dorgaec',
        'state' : 'WY',
        'zip' : '19966',
        'categoryId' : '102',
        'image' : '/images/business/5.jpg',
        'motto' : 'Streamlined full-range budgetary management',
        'version' : 1,
        'active' : true
      }
    },
    {
      'id' : '978',
      'payeeId' : '15',
      'personId' : '206',
      'categoryId' : '103',
      'category' : {
        'id' : '103',
        'categoryName' : 'Food',
        'categoryType' : 'expense'
      },
      'accountId' : '10',
      'txTypeId' : '2',
      'txDate' : '2016-10-01T22:54:00.000Z',
      'version' : 1,
      'cleared' : true,
      'amount' : -5.25,
      'txType' : {
        'id' : '2',
        'typeName' : 'Debit'
      },
      'person' : {
        'firstName' : 'Shen',
        'lastName' : 'Li-Min',
        'gender' : 'female',
        'dateOfBirth' : '1990-06-30',
        'id' : '206',
        'version' : 1,
        'address' : {
          'street' : '293 Muller Street',
          'city' : 'Leffler',
          'state' : 'VT',
          'zip' : '33861-2679'
        }
      },
      'payee' : {
        'id' : '15',
        'payeeName' : 'Heathcote Inc',
        'address' : '798 Defarge Point',
        'city' : 'Tajuwbi',
        'state' : 'WI',
        'zip' : '88464',
        'categoryId' : '103',
        'image' : '/images/business/3.jpg',
        'motto' : 'Secured web-enabled Graphical Clothing Interface',
        'version' : 1,
        'active' : true
      }
    },
    {
      'id' : '1304',
      'payeeId' : '16',
      'personId' : '208',
      'categoryId' : '104',
      'category' : {
        'id' : '104',
        'categoryName' : 'Entertainment',
        'categoryType' : 'expense'
      },
      'accountId' : '13',
      'txTypeId' : '2',
      'txDate' : '2016-10-01T22:44:00.000Z',
      'version' : 1,
      'cleared' : true,
      'amount' : -51.75,
      'txType' : {
        'id' : '2',
        'typeName' : 'Debit'
      },
      'person' : {
        'firstName' : 'Jakita',
        'lastName' : 'Wagner',
        'gender' : 'female',
        'dateOfBirth' : '1988-08-12',
        'id' : '208',
        'version' : 1,
        'address' : {
          'street' : '46892 Virgil Hill',
          'city' : 'Quantico',
          'state' : 'VA',
          'zip' : '68699'
        }
      },
      'payee' : {
        'id' : '16',
        'payeeName' : 'Davis, Muller and Marvin',
        'address' : '319 Nazmo Road',
        'city' : 'Sohcutzeh',
        'state' : 'VT',
        'zip' : '09725',
        'categoryId' : '104',
        'image' : '/images/technics/1.jpg',
        'motto' : 'Persevering regional moratorium',
        'version' : 1,
        'active' : true
      }
    },
    {
      'id' : '489',
      'payeeId' : '24',
      'personId' : '203',
      'categoryId' : '101',
      'category' : {
        'id' : '101',
        'categoryName' : 'Clothing',
        'categoryType' : 'expense'
      },
      'accountId' : '5',
      'txTypeId' : '2',
      'txDate' : '2016-10-01T20:15:00.000Z',
      'version' : 1,
      'cleared' : false,
      'amount' : -8.25,
      'txType' : {
        'id' : '2',
        'typeName' : 'Debit'
      },
      'person' : {
        'firstName' : 'Jack',
        'lastName' : 'Hawksmoor',
        'gender' : 'male',
        'dateOfBirth' : '1974-03-26',
        'id' : '203',
        'version' : 1,
        'address' : {
          'street' : '86853 Donnelly Circle',
          'city' : 'Annester',
          'state' : 'IA',
          'zip' : '42783'
        }
      },
      'payee' : {
        'id' : '24',
        'payeeName' : 'Rodriguez Outfitting',
        'categoryId' : '101',
        'address' : '587 Ipobak Terrace',
        'city' : 'Alexandria',
        'state' : 'VA',
        'zip' : '16097',
        'image' : '/images/nature/6.jpg',
        'motto' : 'Operative maximized matrices',
        'version' : 1,
        'active' : true
      }
    },
    {
      'id' : '1337',
      'payeeId' : '5',
      'personId' : '208',
      'categoryId' : '103',
      'category' : {
        'id' : '103',
        'categoryName' : 'Food',
        'categoryType' : 'expense'
      },
      'accountId' : '13',
      'txTypeId' : '2',
      'txDate' : '2016-10-01T20:11:00.000Z',
      'version' : 1,
      'cleared' : true,
      'amount' : -18.75,
      'txType' : {
        'id' : '2',
        'typeName' : 'Debit'
      },
      'person' : {
        'firstName' : 'Jakita',
        'lastName' : 'Wagner',
        'gender' : 'female',
        'dateOfBirth' : '1988-08-12',
        'id' : '208',
        'version' : 1,
        'address' : {
          'street' : '46892 Virgil Hill',
          'city' : 'Quantico',
          'state' : 'VA',
          'zip' : '68699'
        }
      },
      'payee' : {
        'id' : '5',
        'payeeName' : 'Shop-Rite Grocery Store',
        'address' : '311 St. Paul Ave.',
        'city' : 'Baltimore',
        'state' : 'MD',
        'zip' : '08697',
        'categoryId' : '103',
        'image' : null,
        'motto' : null,
        'version' : 1,
        'active' : true
      }
    },
    {
      'id' : '299',
      'payeeId' : '6',
      'personId' : '202',
      'categoryId' : '103',
      'category' : {
        'id' : '103',
        'categoryName' : 'Food',
        'categoryType' : 'expense'
      },
      'accountId' : '3',
      'txTypeId' : '2',
      'txDate' : '2016-10-01T20:06:00.000Z',
      'version' : 1,
      'cleared' : true,
      'amount' : -6,
      'txType' : {
        'id' : '2',
        'typeName' : 'Debit'
      },
      'person' : {
        'firstName' : 'Lucas',
        'lastName' : 'Trent',
        'gender' : 'male',
        'dateOfBirth' : '1983-02-12',
        'id' : '202',
        'version' : 1,
        'address' : {
          'street' : '8966 Telly Tunnel',
          'city' : 'Rickashire',
          'state' : 'OR',
          'zip' : '90822-8587'
        }
      },
      'payee' : {
        'id' : '6',
        'payeeName' : 'Sushi Land',
        'address' : '808 Calvert St.',
        'city' : 'Baltimore',
        'state' : 'MD',
        'zip' : '01848',
        'categoryId' : '103',
        'image' : null,
        'motto' : null,
        'version' : 1,
        'active' : true
      }
    },
    {
      'id' : '495',
      'payeeId' : '25',
      'personId' : '203',
      'categoryId' : '101',
      'category' : {
        'id' : '101',
        'categoryName' : 'Clothing',
        'categoryType' : 'expense'
      },
      'accountId' : '5',
      'txTypeId' : '2',
      'txDate' : '2016-10-01T19:52:00.000Z',
      'version' : 1,
      'cleared' : true,
      'amount' : -46,
      'txType' : {
        'id' : '2',
        'typeName' : 'Debit'
      },
      'person' : {
        'firstName' : 'Jack',
        'lastName' : 'Hawksmoor',
        'gender' : 'male',
        'dateOfBirth' : '1974-03-26',
        'id' : '203',
        'version' : 1,
        'address' : {
          'street' : '86853 Donnelly Circle',
          'city' : 'Annester',
          'state' : 'IA',
          'zip' : '42783'
        }
      },
      'payee' : {
        'id' : '25',
        'payeeName' : 'Tower Shields',
        'categoryId' : '101',
        'address' : '289 Vaewi Avenue',
        'city' : 'Dorkachek',
        'state' : 'WY',
        'zip' : '19966',
        'image' : '/images/business/5.jpg',
        'motto' : 'Streamlined full-range budgetary management',
        'version' : 1,
        'active' : true
      }
    },
    {
      'id' : '1139',
      'payeeId' : '6',
      'personId' : '207',
      'categoryId' : '103',
      'category' : {
        'id' : '103',
        'categoryName' : 'Food',
        'categoryType' : 'expense'
      },
      'accountId' : '12',
      'txTypeId' : '2',
      'txDate' : '2016-10-01T19:24:00.000Z',
      'version' : 1,
      'cleared' : true,
      'amount' : -6,
      'txType' : {
        'id' : '2',
        'typeName' : 'Debit'
      },
      'person' : {
        'firstName' : 'Spider',
        'lastName' : 'Jerusalem',
        'gender' : 'male',
        'dateOfBirth' : '1977-07-05',
        'id' : '207',
        'version' : 1,
        'address' : {
          'street' : '282 Queenie Drives',
          'city' : 'Hesselview',
          'state' : 'AL',
          'zip' : '04221'
        }
      },
      'payee' : {
        'id' : '6',
        'payeeName' : 'Sushi Land',
        'address' : '808 Calvert St.',
        'city' : 'Baltimore',
        'state' : 'MD',
        'zip' : '01848',
        'categoryId' : '103',
        'image' : null,
        'motto' : null,
        'version' : 1,
        'active' : true
      }
    }
  ];
}
