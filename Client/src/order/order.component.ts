import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  productsList: any;
  userName: string = "";
  shoppingCartId: string = "";
  totalSumWithoutDelivery: number = 0;
  totalSumWithDelivery: number = 0;
  sumDelivery: number = 25;


  constructor(
    private service:ProductService,
    private router:Router,
    private userService:UserService,
    private shopingCartService:ShoppingCartService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.userService.getUserName().subscribe(
        (res: string) => {
          this.userName = res; // Setează userName cu răspunsul primit
          this.userService.getShoppingCartIdByUserName(this.userName).subscribe(
            (res:string) =>{
              this.shoppingCartId = res;
              this.shopingCartService.getProdutsFromShoppingById(this.shoppingCartId).subscribe(
                (res: any) => {
                  this.productsList = res;
                  console.log(this.productsList)
                  this.productsList.forEach(element => {
                    this.totalSumWithoutDelivery += element.sumSelectedQuantity;
                  });
                  this.totalSumWithDelivery = this.totalSumWithoutDelivery + this.sumDelivery;
                }
              )
            }
          );
        },
        error => {
          console.error('Error fetching username:', error);
        }
      );
    }
  }
  createOrder() {
    this.shopingCartService.createOrder(this.shoppingCartId, this.sumDelivery, this.totalSumWithDelivery).subscribe(
      () => {
        // Resetare variabile și formular
        this.resetOrderForm();

        // Curățare completă a datelor din localStorage
        this.clearLocalStorageData();

        // Notificare și redirecționare utilizator
        alert('Comanda a fost plasată cu succes!');
        this.router.navigate(['/confirm-order']); //
      },
      error => {
        console.error('Eroare la plasarea comenzii:', error);
      }
    );
  }
  resetOrderForm() {
    this.productsList = [];
    this.shoppingCartId = "";
    this.totalSumWithoutDelivery = 0;
    this.totalSumWithDelivery = 0;
  }
  clearLocalStorageData() {
    // Șterge datele stocate în localStorage legate de coșul de cumpărături și sesiune
    localStorage.removeItem('shoppingCart'); // Coșul de cumpărături
    localStorage.removeItem('selectedProducts'); // Produsele selectate
    localStorage.removeItem('productCount'); // Cantitatea produselor (presupunem că aici e problema)
  }
}
