export interface Transaction {
    id: string;
    payeeId: string;
    personId: string;
    categoryId: string;
    category: Category;
    accountId: string;
    txType: string;
    txDate: string;
    amount: number;
    payee?: Payee;
}

export interface Payee {
  payeeName: string;
}

export interface Category {
  id: string;
  categoryName: string;
  categoryType: string;
}
