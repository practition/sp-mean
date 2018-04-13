import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxManagerComponent } from './tx-manager.component';

xdescribe('TxManagerComponent', () => {
  let component: TxManagerComponent;
  let fixture: ComponentFixture<TxManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
