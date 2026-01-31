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
  profile: any; 

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
      
      this.userService.getUserName().subscribe(
        (res: string) => {
          this.userName = res;

          
          this.userService.getUserIdByUserName(this.userName).subscribe(
            (userId: string) => {
              this.userId = userId;
              console.log('userId obținut:', this.userId);
            },
            error => console.error('Eroare la obținerea userId:', error)
          );

          
          this.profileService.getProfileByUserName(this.userName).subscribe(
            (profileRes: any) => {
              this.profile = profileRes; 
              console.log('Profilul utilizatorului:', this.profile);
            },
            error => console.error('Eroare la obținerea profilului:', error)
          );

          
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
    this.location.back(); 
  }

  showBackButton(): boolean {
    return this.router.url !== '/home' && window.innerWidth <= 768; 
  }
  createOrder() {
    if (!this.userId || !this.shoppingCartId || !this.totalSumWithDelivery || !this.profile) {
      console.error('⚠️ Date incomplete pentru creare comandă!');
      return;
    }

    
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
      this.profile.address || '',         
      this.profile.city || '',            
      this.profile.phoneNumber || '',     
      this.profile.email || '',           
      this.profile.comments,              
      this.profile.postal || ''           
    ).subscribe(
      () => {
        console.log('✅ Comandă creată cu succes!');

        
        setTimeout(() => {
          this.shoppingCartService.clearCart().subscribe(() => {
            console.log('🗑️ Coșul a fost golit!');
            this.router.navigate(['/confirm-order']);
          });
        }, 10000); 
      },
      error => console.error('❌ Eroare la plasarea comenzii:', error)
    );
  }
}
