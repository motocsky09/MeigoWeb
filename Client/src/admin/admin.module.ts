import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import {AdminComponent} from "./admin.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {InventoryComponent} from "./inventory/inventory.component";
import {CustomersComponent} from "./customers/customers.component";
import {ProductsComponent} from "./products/products.component";
import {OrdersComponent} from "./orders/orders.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { FormsModule } from '@angular/forms';
import { ProductEditPageComponent } from './products/product-edit-page/product-edit-page.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    InventoryComponent,
    OrdersComponent,
    CustomersComponent,
    ProductsComponent,
    ProductEditPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
