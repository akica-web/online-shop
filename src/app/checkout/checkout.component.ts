import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { CartService } from '../cart.service';
import { NgForm } from '@angular/forms';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cart: any;
  order: Order;
  cartItems: string = '';
  totalQuantity: number = 0;
  totalPrice: number = 0;
  successMessage: string = '';

  constructor(private cartService: CartService, private orderService: OrderService) { }



  ngOnInit(): void {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      return;
    } else {
      this.cartService.getCart(cartId).subscribe(cart => {
        this.cart = cart;
        this.totalPrice = cart.totalPrice;
        this.totalQuantity = cart.totalQuantity;
        for (let item of this.cart.items) {
          this.cartItems += ' ' + item.productId.name + ', Quantity: ' + item.quantity + ', Subtotal: $' + item.subTotal + '\n'
          ;
        }

      this.cartItems += ' Total Quantity: ' + this.totalQuantity +'\n' + ' Total Price: $' + this.totalPrice.toFixed(2) + '\n Shipping: FREE';
      });

    }
  }

  save(form: NgForm) {
    const order: Order = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      city: form.value.city,
      email: form.value.email,
      orderReview: form.value.orderReview
    }

    this.orderService.saveOrder(order).subscribe(result => {
      if (result) {
        this.successMessage = result.message;
        localStorage.removeItem('cartId');
        form.reset();
      }
    });

  }

}
