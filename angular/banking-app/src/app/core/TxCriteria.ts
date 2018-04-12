import * as parseDate from 'date-fns/parse';
import _isNil from 'lodash-es/isNil';
import _compact from 'lodash-es/compact';
import _flatten from 'lodash-es/flatten';

import { DateRange, NumberRange } from './ranges';

export class TxCriteria {
  payeeName?: string;
  txDate?: Date;
  txDateBetween?: DateRange;
  // amountBetween?: NumberRange;
  amount?: number;
  categoryName?: string;
  categoryId?: string;
  payeeId?: string;
  accountId?: number;
  txTypeId?: number;
  cleared?: boolean;

  private keys = [ 'payeeName', 'txDate', 'txDateBetween', 'amountBetween',
                   'amount', 'categoryName', 'categoryId', 'accountId', 'payeeId',
                   'txTypeId', 'cleared' ];

  // tslint: disable-next-line
  setTxDate( input: string | number | Date ) {
    if ( typeof input === 'string' || typeof input === 'number' ) {
      this.txDate = parseDate( input );
    } else {
      this.txDate = input;
    }
  }

  constructor( config: object ) {
    this.keys.forEach( key => {
      if ( key === 'txDate' ) {
        this.setTxDate( config[ key ] );
      } else {
        this[ key ] = config[ key ];
      }
    } );
  }

  getQueryString(): string {
    const qs = this.keys.map( key => {
      if ( _isNil( this[ key ] ) || this[ key ] === '' ) {
        return;
      }

      // const val = encodeURIComponent( this[ key ] );
      const val = this[ key ];

      switch ( key ) {
        case 'payeeName':
          return `payee.payeeName=${val}`;
        case 'categoryName':
          return `category.categoryName=${val}`;
        case 'txDate':
          return this.txDate.toISOString();
        case 'txDateBetween':
          return [
            `txDate_gte=${val.from.toISOString()}`,
            `txDate_lte=${val.to.toISOString()}`
          ];
        case 'amount':
        case 'accountId':
        case 'categoryId':
        case 'payeeId':
        case 'txTypeId':
        case 'cleared':
          return `${key}=${val}`;
        default:
          return;
      }
    } );

    return _flatten(_compact( qs )).join( '&' );
  }
}
