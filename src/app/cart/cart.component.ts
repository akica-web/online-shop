import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductServiceService } from '../product-service.service';
import { Product } from '../products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: any;
  totalPrice: number;
  totalQuantity: any;
  product: Product;


  constructor(private cartService: CartService, private productService: ProductServiceService) { }

  ngOnInit(): void {
    let cartId = localStorage.getItem('cartId');

    if (!cartId) {
      return;
    } else {

      this.cartService.getCart(cartId).subscribe(cart => {
        //console.log(cart);
        this.cart = cart.items;
        this.totalPrice = cart.totalPrice;
        this.totalQuantity = cart.totalQuantity;

      });


      /*
      this.cartService.currentTotalQuantity.subscribe(qty => {
        this.totalQuantity = qty;
      });
      this.cartService.currentTotalPrice.subscribe(price => {
        this.totalPrice = price;
      });
      */

      //this.cartService.getQtyAndPrice(cartId);

    }
  }

  /*
  addToCart(productId: string) {

    let cartId = localStorage.getItem('cartId');

    if (!cartId) {
      this.productService.getProduct(productId).subscribe(result => {
        this.product = result;
        console.log(this.product);
        this.cartService.createCart(this.product, null).subscribe(result => {
          console.log(result.cartId);
          localStorage.setItem('cartId', result.cartId);

        });
        //this.cartService.getQtyAndPrice(result.cartId);

      });



    } else {
      this.productService.getProduct(productId).subscribe(result => {
        this.product = result;
        //console.log(this.product);
        this.cartService.createCart(this.product, cartId).subscribe(result => {

        });

      });
      this.cartService.getQtyAndPrice(cartId);
    }



  }
  */


}


