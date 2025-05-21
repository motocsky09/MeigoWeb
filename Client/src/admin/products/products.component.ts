import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  adding = false;

  products = [
    { name: 'Wireless Mouse', category: 'Electronics', price: 24.99, stock: 45, status: 'active' },
    { name: 'Cotton T-shirt', category: 'Clothing', price: 14.99, stock: 120, status: 'inactive' },
    // mai multe produse
  ];

  newProduct = this.createEmptyProduct();

  createEmptyProduct() {
    return {
      name: '',
      category: '',
      price: null,
      stock: null,
      status: 'active'
    };
  }

  startAdding() {
    this.adding = true;
    this.newProduct = this.createEmptyProduct();
  }

  cancelAdding() {
    this.adding = false;
  }

  saveNewProduct() {
  
  }
}
