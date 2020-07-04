import { Injectable } from '@angular/core';
import { Product } from './products';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {


  constructor(private http: HttpClient) { }

getProducts() {
  return this.http.get<Product[]>('http://localhost:3000/products');
}

addingProduct(product: any) {
  return this.http.post('http://localhost:3000/add-product', product);
}

deletingProduct(productId: string) {
  return this.http.delete<{ message: string }>('http://localhost:3000/products/' + productId);
}

getProduct(productId: string) {
  return this.http.get<Product>('http://localhost:3000/product/' + productId);
}


updateProduct(id:string, name: string, price: number, imageUrl: string) {
  const product: Product = {_id: id, name: name, price: price, imageUrl: imageUrl}
  return this.http.put<{ message: string }>('http://localhost:3000/products/' + id, product);
}

getProductsByCategory(categoryId: string) {
  return this.http.get<Product[]>('http://localhost:3000/products/' + categoryId);
}


}

