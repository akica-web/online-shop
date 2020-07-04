import { Component, OnInit } from '@angular/core';
import { Product } from '../products';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  products: Product[] = [];
  updatedProducts: Product[] = [];

  constructor(private productservice: ProductServiceService) { }

  ngOnInit(): void {
    this.productservice.getProducts().subscribe(result => {
      this.products = result;
      const newProducts = result;
    });
  }

  deleteProduct(productId: string) {
    if (confirm('Are you sure that you want to delete this product?')) {
      this.productservice.deletingProduct(productId).subscribe(productData => {
        console.log(productData.message);
        this.updatedProducts = this.products.filter(p => p._id !== productId);
        this.products = this.updatedProducts;
      });
    } else {
      return;
    }
  }

}
