import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './products';
import { Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventEmitter } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: CartItems;


private totalQuantity = new Subject<number>();
private totalPrice = new Subject<number>();

currentTotalQuantity = this.totalQuantity.asObservable();
currentTotalPrice = this.totalPrice.asObservable();


  constructor(private http: HttpClient) { }

  createCart(product: Product, cartId: string) {
    return this.http.post<{cartId: string}>('http://localhost:3000/cart/',
    {
      product: product,
      cartId: cartId
    });
  }




  getCart(cartId: string) {
     return this.http.get<CartItems>('http://localhost:3000/cart/' +  cartId);
     //.pipe(map(response => response.items));
  }

  /*

  getQtyAndPrice(cartId: string) {
    this.http.get<CartItems>('http://localhost:3000/cart/' +  cartId).subscribe(cart => {

    //this.cart = cart;


    this.totalQuantity.next(cart.totalQuantity);
    this.totalPrice.next(cart.totalPrice);

    });
  }
*/
}


export interface CartItems {
  _id: string,
  items: [
    {
      _id: string,
      productId: {
        categoryId: string,
        imageUrl: string,
        name: string,
        price: number,
        __v: number,
        _id: string;
      },
      quantity: number,
      subTotal: number
    }
  ],
  totalPrice: number,
  totalQuantity: number
  __v: number
}
