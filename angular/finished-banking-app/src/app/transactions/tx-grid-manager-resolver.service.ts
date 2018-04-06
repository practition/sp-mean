import { Injectable } from '@angular/core';
import { TransactionsDaoService } from '../core/transactions-dao.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Transaction } from './Transaction';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TxGridManagerResolverService implements Resolve<Transaction[]>{

  constructor(private dao: TransactionsDaoService) { }

  resolve( route: ActivatedRouteSnapshot,
           state: RouterStateSnapshot ): Observable<Transaction[]> | Promise<Transaction[]> | Transaction[] {
    const account = route.paramMap.get( 'account' );

    return undefined;
  }



}
