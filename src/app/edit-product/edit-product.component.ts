import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductServiceService } from '../product-service.service';
import { Product } from '../products';
import { CategoryService } from '../category.service';
import { Category } from '../categories';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId: string;
  product: Product;
  categories: Category[];


  constructor(private productService: ProductServiceService, private route: ActivatedRoute, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
        this.productId = paramMap.get('productId');
        console.log(this.productId);
        this.categoryService.getCategories().subscribe(result => {
          this.categories = result;
          });
        this.productService.getProduct(this.productId).subscribe(result => {
        this.product = result;
      });



      } else {
        this.productId = null;
        this.router.navigate(['']);
      }


    });
  }


  editProduct(form: NgForm) {

    this.productService.updateProduct(this.productId, form.value.name, form.value.price, form.value.imageUrl).subscribe(result => {
      console.log(result.message);
      this.router.navigate(['']);
    });
  }


}
