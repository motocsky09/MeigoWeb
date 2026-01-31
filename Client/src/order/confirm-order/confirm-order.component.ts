import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/services/shopping-cart.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {

  constructor(
    private shoppingCartService: ShoppingCartService, 
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.clearShoppingCart();

    
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 5000); 
  }

  clearShoppingCart() {
    
    this.shoppingCartService.clearCart().subscribe(
      () => {
        console.log('Produsele din coș au fost șterse.');
      },
      error => {
        console.error('Eroare la ștergerea produselor din coș:', error);
      }
    );
  }
}
