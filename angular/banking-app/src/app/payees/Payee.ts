export interface Payee {
  id: string;
  payeeName?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  categoryId?: string;
  image?: string;
  motto?: string;
  version?: number;
  active: boolean;
}
