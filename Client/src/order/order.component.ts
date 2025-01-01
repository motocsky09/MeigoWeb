import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { UserService } from 'src/services/user.service';
import { ProfileService } from 'src/services/profile.service';
import {LoadingService} from "../services/loading.service";

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
  profile: any; // Adăugăm un obiect de profil pentru a accesa adresa

  constructor(
    private service: ProductService,
    private router: Router,
    private userService: UserService,
    private shoppingCartService: ShoppingCartService,
    private profileService: ProfileService, // Injectăm ProfileService
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.userService.getUserName().subscribe(
        (res: string) => {
          this.userName = res;

          // Obținem datele profilului utilizatorului, inclusiv adresa
          this.profileService.getProfileByUserName(this.userName).subscribe(
            (profileRes: any) => {
              this.profile = profileRes; // Acum putem accesa profile.address
            },
            error => {
              console.error('Error fetching profile:', error);
            }
          );

          // Obținem datele coșului de cumpărături și calculăm sumele
          this.userService.getShoppingCartIdByUserName(this.userName).subscribe(
            (cartId: string) => {
              this.shoppingCartId = cartId;
              this.shoppingCartService.getProdutsFromShoppingById(this.shoppingCartId).subscribe(
                (cartProducts: any) => {
                  this.productsList = cartProducts;
                  this.productsList.forEach(element => {
                    this.totalSumWithoutDelivery += element.sumSelectedQuantity;
                  });
                  this.totalSumWithDelivery = this.totalSumWithoutDelivery + this.sumDelivery;
                }
              );
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

    this.shoppingCartService.createOrder(this.shoppingCartId, this.sumDelivery, this.totalSumWithDelivery).subscribe(
      () => {

        setTimeout(() => {
          this.loadingService.hide(); // Ascunde indicatorul de încărcare
          this.router.navigate(['/confirm-order']); // Redirecționează la confirmare
        }, 2000);
      },
      error => {
        console.error('Eroare la plasarea comenzii:', error);
        this.loadingService.hide(); // Ascunde indicatorul dacă apare o eroare
      }
    );
  }
}
