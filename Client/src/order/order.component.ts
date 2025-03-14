import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { UserService } from 'src/services/user.service';
import { ProfileService } from 'src/services/profile.service';
import { Location } from '@angular/common';

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
    private location: Location,
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
              console.log('userId obținut:', this.userId);
            },
            error => console.error('Eroare la obținerea userId:', error)
          );

          // Obține profilul (inclusiv adresa)
          this.profileService.getProfileByUserName(this.userName).subscribe(
            (profileRes: any) => {
              this.profile = profileRes; // Setează profilul
              console.log('Profilul utilizatorului:', this.profile);
            },
            error => console.error('Eroare la obținerea profilului:', error)
          );

          // Obține ShoppingCartId și produsele din coș
          this.userService.getShoppingCartIdByUserName(this.userName).subscribe(
            (cartId: string) => {
              this.shoppingCartId = cartId;
              console.log('shoppingCartId:', this.shoppingCartId);

              this.shoppingCartService.getProdutsFromShoppingById(this.shoppingCartId).subscribe(
                (cartProducts: any) => {
                  this.productsList = cartProducts;
                  this.totalSumWithoutDelivery = this.productsList.reduce(
                    (sum, product) => sum + product.sumSelectedQuantity, 0
                  );
                  this.totalSumWithDelivery = this.totalSumWithoutDelivery + this.sumDelivery;
                  console.log('Total fără livrare:', this.totalSumWithoutDelivery);
                  console.log('Total cu livrare:', this.totalSumWithDelivery);
                },
                error => console.error('Eroare la obținerea produselor:', error)
              );
            },
            error => console.error('Eroare la obținerea shoppingCartId:', error)
          );
        },
        error => console.error('Eroare la obținerea userName:', error)
      );
    }
  }
  goBack() {
    this.location.back(); // Navighează înapoi
  }

  showBackButton(): boolean {
    return this.router.url !== '/home' && window.innerWidth <= 768; // Afișează doar pe mobile și în afara paginii home
  }
  createOrder() {
    if (!this.userId || !this.shoppingCartId || !this.totalSumWithDelivery || !this.profile) {
      console.error('⚠️ Date incomplete pentru creare comandă!');
      return;
    }

    // Asigurare că comments are o valoare implicită
    this.profile.comments = this.profile.comments || '';

    console.log('📤 Date trimise către backend:', {
      userId: this.userId,
      shoppingCartId: this.shoppingCartId,
      sumDelivery: this.sumDelivery,
      totalSumWithDelivery: this.totalSumWithDelivery,
      address: this.profile.address,
      city: this.profile.city,
      phoneNumber: this.profile.phoneNumber,
      email: this.profile.email,
      comments: this.profile.comments,
      postal: this.profile.postal
    });

    console.log('📤 Trimitere comandă...');

    this.shoppingCartService.createOrder(
      this.userId,
      this.shoppingCartId,
      this.sumDelivery,
      this.totalSumWithDelivery,
      this.profile.address || '',         // Adresa din profil
      this.profile.city || '',            // Orașul din profil
      this.profile.phoneNumber || '',     // Telefonul din profil
      this.profile.email || '',           // Email-ul din profil
      this.profile.comments,              // Comentarii (asigurate să nu fie undefined)
      this.profile.postal || ''           // Codul poștal
    ).subscribe(
      () => {
        console.log('✅ Comandă creată cu succes!');

        // Delay de 10 secunde înainte de a goli coșul și a redirecționa
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
