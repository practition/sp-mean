import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeSummary } from './HomeSummary';
import { Observable } from 'rxjs/Observable';
import { Transaction } from './Transaction';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class HomeDaoService {
  baseUrl = 'http://localhost:8001';

  constructor(private http: HttpClient) { }

  getTxById(id: number | string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}/tx/${id}`);
  }

  getLatestTx(): Observable<Transaction> {
    return this.http
      .get<Transaction[]>(`${this.baseUrl}/tx/?_sort=txDate&_order=desc&_limit=1&_expand=payee`)
      .pipe( catchError(this.someErrorHandler) )
      .map(transactions => transactions[0]);
  }

  someErrorHandler(err): ErrorObservable {
    // Http error?

    // Other kind of error?

    return new ErrorObservable('Oops, something went wrong');
  }

  getAmountSpentByCategory(categoryName: string): Observable<number> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/tx?category.categoryName=${categoryName}&txDate_like=2016-07-`)
      .map(transactions => {
        let total = 0;
        transactions.forEach(tx => total += tx.amount);
        return total;
      });
  }

  getAmountSpentByCategoryReduce(categoryName: string): Observable<number> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/tx?category.categoryName=${categoryName}&txDate_like=2016-07-`)
      .map(transactions => transactions.map(tx => tx.amount).reduce((total, current) => total + current));
  }

  getSummary(): HomeSummary {
    return {
      lastTxAmount: 28.76,
      lastTxPayee: 'Shop-Rite',
      categoryAmount: 250,
      category: 'Groceries'
    };
  }

}
