import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductComponent } from './product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FontAwesomeModule
  ]
})
export class ProductModule { }
