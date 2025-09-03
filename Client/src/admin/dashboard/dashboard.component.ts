import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/services/customers.service';
import { OrdersService } from 'src/services/orders.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usersCount = 0;
  ordersCount = 0;
  productsCount = 0;
  totalRevenue = 0;

  // Statistici pentru grafice
  ordersPerMonth: { [month: string]: number } = {};
  revenuePerMonth: { [month: string]: number } = {};

  months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  revenueBarDivisor: number = 20; // default, recalculat după date

  constructor(
    private customersService: CustomersService,
    private ordersService: OrdersService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.customersService.getCustomers().subscribe((users: any[]) => {
      this.usersCount = users.filter(u => !((u.userName || u.username || '').endsWith('.admin'))).length;
    });
    this.ordersService.getOrders().subscribe((orders: any[]) => {
      this.ordersCount = orders.length;
      this.totalRevenue = orders.reduce((sum, o) => sum + (o.totalamount || o.total || o.totalPrice || o.amount || 0), 0);
      // Statistici pe luni (cheie: 'Jan', 'Feb', ...)
      this.ordersPerMonth = {};
      this.revenuePerMonth = {};
      orders.forEach(order => {
        const date = order.orderDate ? new Date(order.orderDate) : null;
        if (date) {
          const month = date.toLocaleString('en-US', { month: 'short' });
          this.ordersPerMonth[month] = (this.ordersPerMonth[month] || 0) + 1;
          this.revenuePerMonth[month] = (this.revenuePerMonth[month] || 0) + (order.totalamount || order.total || order.totalPrice || order.amount || 0);
        }
      });
      // Normalizez înălțimea barelor pentru revenue
      const maxRevenue = Math.max(...Object.values(this.revenuePerMonth), 1);
      const maxOrders = Math.max(...Object.values(this.ordersPerMonth), 1);
      this.revenueBarDivisor = maxRevenue / (maxOrders * 18);
      if (!isFinite(this.revenueBarDivisor) || this.revenueBarDivisor < 1) this.revenueBarDivisor = 20;
    });
    this.productService.getProductsList().subscribe((products: any) => {
      this.productsCount = Array.isArray(products) ? products.length : (products?.length || 0);
    });
  }
}
