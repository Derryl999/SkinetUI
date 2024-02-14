import * as cuid from 'cuid';

export interface BasketItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
  brand: string;
  type: string;
}

export interface Basket {
  id: string;
  items: BasketItem[];
  getSalary(empCode: number): number;
}

export interface BasketTotals {
  shipping: number;
  subtotal: number;
  total: number;
}
export class Basket implements Basket {
  id = cuid();
  items: BasketItem[] = [];
}
