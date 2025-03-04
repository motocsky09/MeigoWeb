import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { UserService } from 'src/services/user.service';
import { ProfileService } from 'src/services/profile.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  userId: string = "";
  productsList: any[] = [];
  userName: string = "";
  shoppingCartId: string = "";
  totalSumWithoutDelivery: number = 0;
  totalSumWithDelivery: number = 0;
  sumDelivery: number = 25;
  profile: any; // Pentru adresa utilizatorului

  constructor(
    private service: ProductService,
    private router: Router,
    private userService: UserService,
    private shoppingCartService: ShoppingCartService,
    private profileService: ProfileService,
  ) {}

  ngOnInit() {
    if (localStorage.getItem('token')) {
      // Obține userName
      this.userService.getUserName().subscribe(
        (res: string) => {
          this.userName = res;

          // Obține userId
          this.userService.getUserIdByUserName(this.userName).subscribe(
            (userId: string) => {
              this.userId = userId;
              console.log('✅ userId obținut:', this.userId);
            },
            error => console.error('❌ Eroare la obținerea userId:', error)
          );

          // Obține profilul (inclusiv adresa)
          this.profileService.getProfileByUserName(this.userName).subscribe(
            (profileRes: any) => {
              this.profile = profileRes; // Setează profilul
              console.log('📦 Profilul utilizatorului:', this.profile);
            },
            error => console.error('❌ Eroare la obținerea profilului:', error)
          );

          // Obține ShoppingCartId și produsele din coș
          this.userService.getShoppingCartIdByUserName(this.userName).subscribe(
            (cartId: string) => {
              this.shoppingCartId = cartId;
              console.log('🛒 shoppingCartId:', this.shoppingCartId);

              this.shoppingCartService.getProdutsFromShoppingById(this.shoppingCartId).subscribe(
                (cartProducts: any) => {
                  this.productsList = cartProducts;
                  this.totalSumWithoutDelivery = this.productsList.reduce(
                    (sum, product) => sum + product.sumSelectedQuantity, 0
                  );
                  this.totalSumWithDelivery = this.totalSumWithoutDelivery + this.sumDelivery;
                  console.log('💰 Total fără livrare:', this.totalSumWithoutDelivery);
                  console.log('🚚 Total cu livrare:', this.totalSumWithDelivery);
                },
                error => console.error('❌ Eroare la obținerea produselor:', error)
              );
            },
            error => console.error('❌ Eroare la obținerea shoppingCartId:', error)
          );
        },
        error => console.error('❌ Eroare la obținerea userName:', error)
      );
    }
  }

  createOrder() {
    if (!this.userId || !this.shoppingCartId || !this.totalSumWithDelivery) {
      console.error('⚠️ Date incomplete pentru creare comandă!');
      return;
    }

    console.log('📤 Trimitere comandă...');
    this.shoppingCartService.createOrder(this.userId, this.shoppingCartId, this.sumDelivery, this.totalSumWithDelivery).subscribe(
      () => {
        console.log('✅ Comandă creată cu succes!');

        // Delay de 10 secunde înainte de redirect și ștergere coș
        setTimeout(() => {
          this.shoppingCartService.clearCart().subscribe(() => {
            console.log('🗑️ Coșul a fost golit!');
            this.router.navigate(['/confirm-order']);
          });
        }, 10000); // 10 secunde delay
      },
      error => console.error('❌ Eroare la plasarea comenzii:', error)
    );
  }
}