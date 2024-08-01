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
  sumDelivery: number = 5;

  constructor(
    private service:ProductService,
    private router:Router,
    private userService:UserService,
    private shoopingCartService:ShoppingCartService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.userService.getUserName().subscribe(
        (res: string) => {
          this.userName = res; // Setează userName cu răspunsul primit
          this.userService.getShoppingCartIdByUserName(this.userName).subscribe(
            (res:string) =>{
                this.shoppingCartId = res;
                this.shoopingCartService.getProdutsFromShoppingById(this.shoppingCartId).subscribe(
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
}
