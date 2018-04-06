import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxDetailComponent } from './tx-detail.component';
import { Transaction } from '../Transaction';
import { SharedModule } from '../../shared/shared.module';

describe( 'TxDetailComponent', () => {
  let component: TxDetailComponent;
  let fixture: ComponentFixture<TxDetailComponent>;
  let testLastTx: Transaction;

  beforeEach( async( () => {
    TestBed.configureTestingModule( {
        imports : [ SharedModule ],
        declarations : [ TxDetailComponent ]
      } )
      .compileComponents();

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
  } ) );

  beforeEach( () => {
    fixture = TestBed.createComponent( TxDetailComponent );
    component = fixture.componentInstance;
    component.tx = testLastTx;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );
} );
