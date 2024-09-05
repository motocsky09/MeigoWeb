import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductComponent } from './product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ProductPageComponent } from './product-page/product-page.component';


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductComponent,
    ProductPageComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FontAwesomeModule, 
    FormsModule
  ]
})
export class ProductModule { }
