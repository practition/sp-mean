import { Category } from '../categories/Category';
import { Payee } from '../payees/Payee';

export class Transaction {
  id: string;
  payeeId?: string;
  personId?: string;
  categoryId: string;
  category?: Category;
  accountId: string;
  txTypeId: string;
  txDate: string | Date;
  version: number;
  amount: number;
  cleared: boolean;
  txType?: object;
  payee?: Payee;
  person?: object;

  private keys = [ 'id', 'payeeId', 'personId', 'categoryId', 'category', 'accountId', 'txTypeId', 'txDate', 'version',
                   'amount', 'txType', 'cleared', 'payee', 'person' ];

  private defaults = {
    id : '0',
    payeeId : '0',
    personId : '0',
    categoryId : '0',
    accountId : '0',
    txTypeId : '0',
    txDate : '1970-01-01T00:00:00.000Z',
    version : 0,
    amount : 0,
    txType : '0',
    cleared: false
  };

  constructor( config: object ) {
    const temp = Object.assign( {}, this.defaults, config );
    this.keys.forEach( key => this[ key ] = temp[ key ] );
  }
}
