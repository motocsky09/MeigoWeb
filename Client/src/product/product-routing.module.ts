import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import {ProductPageComponent} from "./product-page/product-page.component";

const routes: Routes = [
  {  path: 'products-list', component:ProductsListComponent},
  { path: 'product-page/:productId', component: ProductPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
