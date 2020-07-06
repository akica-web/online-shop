import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';


const routes: Routes = [
  { path: '', component: ProductListComponent},
  { path: 'products/:id', component: ProductListComponent},
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'edit-product/:productId', component: EditProductComponent, canActivate: [AuthGuard] },
  { path: 'manage-products', component: ManageProductsComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'manage-orders', component: ManageOrdersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
