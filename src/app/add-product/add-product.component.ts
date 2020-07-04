import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductServiceService } from '../product-service.service';
import { Router } from '@angular/router';
import { Product } from '../products';
import { Subject } from 'rxjs';
import { CategoryService } from '../category.service';
import { Category } from '../categories';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

 totalPrice = new Subject<number>();
categories: Category[] = [];

  constructor(private productservice: ProductServiceService, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(result => {
      this.categories = result;
    })
  }


  addProduct(form: NgForm) {
    const product: any = {
      name: form.value.name,
      price: form.value.price,
      imageUrl: form.value.imageUrl,
      categoryId: form.value.category
    }
    this.productservice.addingProduct(product).subscribe(
    );
    this.totalPrice.next(form.value.price);
    this.router.navigate(['']);
  }

}
