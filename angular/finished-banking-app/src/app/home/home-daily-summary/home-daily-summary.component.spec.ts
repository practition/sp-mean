import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDailySummaryComponent } from './home-daily-summary.component';
import { HomeDaoService } from '../home-dao.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Transaction } from '../../transactions/Transaction';
import Spy = jasmine.Spy;
import { SharedModule } from '../../shared/shared.module';
import { HomeSummary } from '../HomeSummary';
import { CurrencyPipe } from '@angular/common';

describe('HomeDailySummaryComponent', () => {
  let component: HomeDailySummaryComponent;
  let fixture: ComponentFixture<HomeDailySummaryComponent>;
  let mockSummary: HomeSummary;
  let mockLastTx: Transaction;
  let getSummarySpy: Spy;
  const currencyPipe = new CurrencyPipe('en-US');

  beforeEach(async(() => {
    const mockDao = jasmine.createSpyObj('HomeDaoService',
      ['getSummary']);

    mockLastTx = getTestTransaction();
    mockSummary = {
      lastTx: mockLastTx,
      lastTxPayee: mockLastTx.payee.payeeName,
      lastTxAmount: mockLastTx.amount,
      categoryAmount: 8547.68,
      category: mockLastTx.category.categoryName,
      notClearedCount: 5
    };

    getSummarySpy = mockDao.getSummary.and.returnValue(Observable.of(mockSummary));

    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [{
        provide: HomeDaoService,
        useValue: {
          getSummary: () => {
            console.log('Faked DAO called.');
            return Observable.of(mockSummary);
          }
        }
      }],
      declarations: [HomeDailySummaryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDailySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a last transaction amount and payee', () => {
    fixture.detectChanges();
    const firstP = fixture.nativeElement.querySelector('div.card-body > p');
    expect(firstP.textContent).toContain(mockSummary.lastTxPayee);
    expect(firstP.textContent).toContain(`\$${Math.abs(mockSummary.lastTxAmount)}`);
  });

  it('should show category total', () => {
    const secondP = fixture.nativeElement.querySelector('div.card-body > p:nth-child(2)');
    expect(secondP.textContent).toContain(currencyPipe.transform(`${Math.abs(mockSummary.categoryAmount)}`));
    expect(secondP.textContent).not.toContain('$0.00');
  });

  it('should show the number of not-cleared transactions', () => {
    fixture.detectChanges();
    const thirdP = fixture.nativeElement.querySelector('div.card-body > p:nth-child(3)');
    expect(thirdP.textContent).toEqual(`You have ${mockSummary.notClearedCount} pending transactions.`);
    expect(thirdP.textContent).not
      .toEqual(`You have ${mockSummary.notClearedCount} transactions that have not cleared yet.`);
  });

  it('should have called getSummary()', () => {
    expect(getSummarySpy).not.toHaveBeenCalled();
  });

});

function getTestTransaction(): Transaction {
  return new Transaction({
    'id': '5',
    'payeeId': '14',
    'personId': '201',
    'categoryId': '105',
    'category': {
      'id': '105',
      'categoryName': 'Medical',
      'categoryType': 'expense'
    },
    'accountId': '1',
    'txTypeId': '2',
    'txDate': '2016-07-09T16:06:00.000Z',
    'version': 1,
    'cleared': false,
    'amount': -86.25,
    'payee': {
      'id': '14',
      'payeeName': 'Ziener & Ratke, Pediatrics',
      'address': '1873 Razif Loop',
      'city': 'Fonzopo',
      'state': 'FL',
      'zip': '55902',
      'categoryId': '105',
      'image': '/images/business/2.jpg',
      'motto': 'Multi-lateral grid-enabled toolset',
      'version': 1,
      'active': true
    }
  });
}
