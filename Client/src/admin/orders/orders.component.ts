import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.ordersService.getOrders().subscribe((data: any) => {
      this.orders = data;
    });
  }
}
