import { Transaction } from '../transactions/Transaction';

export interface HomeSummary {
  lastTx?: Transaction;
  lastTxAmount?: number;
  lastTxPayee?: string;
  categoryAmount?: number;
  category?: string;
  notClearedCount?: number;
}
