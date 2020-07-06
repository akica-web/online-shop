import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  saveOrder(order: Order) {
    return this.http.post<{ message: string }>('http://localhost:3000/check-out', order);
  }

  getOrders(userId: string) {
    return this.http.get<{ result: any }>('http://localhost:3000/orders/' + userId);
  }

  getAllOrders() {
    return this.http.get<{ result: any }>('http://localhost:3000/all-orders');
  }

}
