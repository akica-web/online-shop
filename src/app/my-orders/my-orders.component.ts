import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders: any[] = [];
  //updatedOrders: any[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return;
    } else {
      this.orderService.getOrders(userId).subscribe(result => {
        console.log(result);
        this.orders = result.result;
      });
    }

  }


}
