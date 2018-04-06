import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxGridComponent } from './tx-grid.component';
import { SharedModule } from '../../shared/shared.module';

describe( 'TxGridComponent', () => {
  let component: TxGridComponent;
  let fixture: ComponentFixture<TxGridComponent>;

  beforeEach( async( () => {
    TestBed.configureTestingModule( {
        imports : [ SharedModule ],
        declarations : [ TxGridComponent ]
      } )
      .compileComponents();
  } ) );

  beforeEach( () => {
    fixture = TestBed.createComponent( TxGridComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );
} );
