import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../products';
import { ProductServiceService } from '../product-service.service';
import { CategoryService } from '../category.service';
import { Category } from '../categories';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent  implements OnInit {

  categoryId: string;
  isActiveAllProducts: boolean = true;

  constructor(private productservice: ProductServiceService, private categoryService: CategoryService, private route: ActivatedRoute, private cartService: CartService) { }


products: Product[] = [];
updatedProducts: Product[] = [];
categories: Category[] = [];
product: Product;

totalPrice: number;
totalQuantity: number;




  ngOnInit(): void {

    this.categoryService.getCategories().subscribe(result => {
      this.categories = result;
    });

    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.isActiveAllProducts = false;
        this.categoryId = paramMap.get('id');
        this.productservice.getProductsByCategory(this.categoryId).subscribe(result => {
          this.products = result;

        });
      } else {
        this.isActiveAllProducts = true;
          this.productservice.getProducts().subscribe(result => {
          this.products = result;
          const newProducts = result;
          this.sumProducts(newProducts);
        });
      }

    });





  }


  addToCart(productId: string) {

    let cartId = localStorage.getItem('cartId');

    //let id: string;

    if (!cartId) {
      this.productservice.getProduct(productId).subscribe(result => {
        this.product = result;
        console.log(this.product);
        this.cartService.createCart(this.product, null).subscribe(result => {
          //this.cartService.getQtyAndPrice(result.cartId);
          localStorage.setItem('cartId', result.cartId);
        });
      });


 }
     else {
      this.productservice.getProduct(productId).subscribe(result => {
        this.product = result;
        this.cartService.createCart(this.product, cartId).subscribe(result => {

        });
      });

      //

    }


  }


  deleteProduct(productId: string) {
    if (confirm('Are you sure that you want to delete this product?')) {
      this.productservice.deletingProduct(productId).subscribe(productData => {
        console.log(productData.message);
        this.updatedProducts = this.products.filter(p => p._id !== productId);
        this.products = this.updatedProducts;
        const newProducts = this.products;
        this.sumProducts(newProducts);
      });
    } else {
      return;
    }
  }

  sumProducts(arr) {
    let sum = 0;
    let qty = 0;
        for (let product of arr) {
          sum += +product.price;
          qty += 1;
        }
        this.totalPrice = sum;
        this.totalQuantity = qty;
  }

}
