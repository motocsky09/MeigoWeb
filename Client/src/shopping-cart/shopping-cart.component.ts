import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  productsList: any;
  userName: string = "";
  shoppingCartId: string = "";
  totalSumWithoutDelivery: number = 0;
  totalSumWithDelivery: number = 0;
  sumDelivery: number = 25;
  recalculateTotals() {
    this.totalSumWithoutDelivery = this.productsList.reduce((sum, item) => sum + item.sumSelectedQuantity, 0);
    this.totalSumWithDelivery = this.totalSumWithoutDelivery + this.sumDelivery;
  }

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
  updateQuantity(item: any) {
    // Asigură-te că cantitatea este cel puțin 1
    item.selectedQuantity = Math.max(1, +item.selectedQuantity);

    // Recalculează subtotalul pentru produs
    item.sumSelectedQuantity = item.price * item.selectedQuantity;

    // Recalculează totalurile
    this.recalculateTotals();
  }
  clearShoppingCart() {
    this.shopingCartService.clearCart().subscribe(
      (response) => {
        // Golește lista locală de produse
        this.productsList = [];
        this.totalSumWithoutDelivery = 0;
        this.totalSumWithDelivery = this.sumDelivery; // Doar costul transportului rămâne
        console.log('Coșul de cumpărături a fost golit cu succes.');
      },
      (error) => {
        console.error('Eroare la golirea coșului de cumpărături:', error);
      }
    );
  }
}
