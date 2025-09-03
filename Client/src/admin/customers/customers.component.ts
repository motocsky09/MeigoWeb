import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];

  constructor(private customersService: CustomersService) {}

  ngOnInit() {
    this.customersService.getCustomers().subscribe((data: any) => {
      // Filtrează clienții care nu au username cu .admin
      this.customers = data.filter((c: any) => !((c.userName || c.username || '').endsWith('.admin')));
    });
  }
}
