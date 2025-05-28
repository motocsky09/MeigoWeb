import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin.module';
import {UserComponent} from "../user/user.component";
import {RegisterComponent} from "../user/register/register.component";
import {LoginComponent} from "../user/login/login.component";
import {AdminComponent} from "./admin.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {InventoryComponent} from "./inventory/inventory.component";
import {ProductsListComponent} from "../product/products-list/products-list.component";
import {OrdersComponent} from "./orders/orders.component";
import {CustomersComponent} from "./customers/customers.component";
import {ProductsComponent} from "./products/products.component";
import { ProductEditPageComponent } from './products/product-edit-page/product-edit-page.component';
import { AdminAuthGuard } from './admin-auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminAuthGuard], // 👈 protejează întreaga secțiune
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'customer', component: CustomersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/edit/:id', component: ProductEditPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
