import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BankingDailyStatusComponent } from './banking-daily-status.component';
import { TransactionsDaoService } from '../core/transactions-dao.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Transaction } from '../transactions/Transaction';
import Spy = jasmine.Spy;
import { SharedModule } from '../shared/shared.module';

describe( 'BankingDailyStatusComponent', () => {
  let component: BankingDailyStatusComponent;
  let fixture: ComponentFixture<BankingDailyStatusComponent>;
  let testNotClearedCount: number;
  let testLastTx: Transaction;
  let testQueryResults: Transaction[];
  let getNotClearedCountSpy: Spy;
  let querySpy: Spy;

  beforeEach( async( () => {
    const mockDao = jasmine.createSpyObj( 'TransactionsDaoService',
      [ 'getNotClearedCount', 'query' ] );

    testNotClearedCount = 5;
    testLastTx = new Transaction( {
      'id' : '5',
      'payeeId' : '14',
      'personId' : '201',
      'categoryId' : '105',
      'category' : {
        'id' : '105',
        'categoryName' : 'Medical',
        'categoryType' : 'expense'
      },
      'accountId' : '1',
      'txTypeId' : '2',
      'txDate' : '2016-07-09T16:06:00.000Z',
      'version' : 1,
      'cleared' : false,
      'amount' : -86.25,
      'payee' : {
        'id' : '14',
        'payeeName' : 'Ziener & Ratke, Pediatrics',
        'address' : '1873 Razif Loop',
        'city' : 'Fonzopo',
        'state' : 'FL',
        'zip' : '55902',
        'categoryId' : '105',
        'image' : '/images/business/2.jpg',
        'motto' : 'Multi-lateral grid-enabled toolset',
        'version' : 1,
        'active' : true
      }
    } );
    testQueryResults = getTestData()
      .filter( tx => tx.category.categoryType === 'expense' )
      .map( tx => new Transaction( tx ) );

    getNotClearedCountSpy = mockDao.getNotClearedCount.and.returnValue( Observable.of( testNotClearedCount ) );
    querySpy = mockDao.query.and.returnValue( Observable.of( testQueryResults ) );

    TestBed.configureTestingModule( {
        imports : [ SharedModule ],
        providers : [ {
          provide : TransactionsDaoService,
          useValue : mockDao
        } ],
        declarations : [ BankingDailyStatusComponent ]
      } )
      .compileComponents();
  } ) );

  beforeEach( () => {
    fixture = TestBed.createComponent( BankingDailyStatusComponent );
    component = fixture.componentInstance;
    component.lastTx = testLastTx;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );

  it( 'should have a last transaction', () => {
    fixture.detectChanges();
    const firstP = fixture.nativeElement.querySelector( 'div.card-body > p' );
    expect( firstP.textContent ).toContain( testLastTx.payee.payeeName );
    expect( firstP.textContent ).toContain( `\$${Math.abs( testLastTx.amount )}` );
    expect( firstP.textContent ).toMatch( /(pay|receive)/ );
  } );

  it( 'should show the number of not-cleared transactions', () => {
    fixture.detectChanges();
    const secondP = fixture.nativeElement.querySelector( 'div.card-body > p:nth-child(2)' );
    expect( secondP.textContent ).toEqual( `You have ${testNotClearedCount} transactions that have not cleared yet.` );
    expect( secondP.textContent ).not
      .toEqual( `You have ${testNotClearedCount * 2} transactions that have not cleared yet.` );
  } );

  it( 'should show category grouping', () => {
    const thirdP = fixture.nativeElement.querySelector( 'div.card-body > p:nth-child(3)' );
    const summaryAmount = testQueryResults[ 0 ].amount + testQueryResults[ 1 ].amount;
    expect( thirdP.textContent ).toContain( `\$${Math.abs( summaryAmount )}` );
    expect( thirdP.textContent ).not.toContain( '$0.00' );
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
    }
  ];
}
