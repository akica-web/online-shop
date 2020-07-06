import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  orders: any[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(result => {
      //console.log(result.result);
      this.orders = result.result;
    });
  }

}
