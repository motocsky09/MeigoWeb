import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/services/user.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  faCartShopping = faCartShopping;

  productsList: any;
  userName: string = "";
  shoppingCartId: string = "";
  cartCounter: number = 0;
  selectedQuantity: any;

  constructor(
    private service:ProductService,
    private router:Router,
    private userService:UserService,
    private shoopingCartService:ShoppingCartService
  ) { }

  ngOnInit(){
    this.service.getProductsList().subscribe(
        (res:any) => {
            this.productsList = res;
            console.log(this.productsList);
        }
    );

    if (localStorage.getItem('token') != null) {
        this.userService.getUserName().subscribe(
            (res: string) => {
                this.userName = res; // Setează userName cu răspunsul primit
                this.userService.getShoppingCartIdByUserName(this.userName).subscribe(
                    (res:string) => {
                        this.shoppingCartId = res;
                        this.shoopingCartService.getShoppingCartListById(this.shoppingCartId).subscribe(
                            (res: any) => {
                                this.cartCounter = res.length;
                                localStorage.setItem('cartCounter', this.cartCounter.toString());
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

    const savedCartCounter = localStorage.getItem('cartCounter');
    if (savedCartCounter) {
        this.cartCounter = parseInt(savedCartCounter, 10);
    }
}

getProductsList(){
    this.service.getProductsList().subscribe(
        (res:any) => {
            this.productsList = res;
        }
    );
}

getProductsListByCategoryId(categoryId:any){
    this.service.getProductsListByCategoryId(categoryId).subscribe(
        (res:any) => {
            this.productsList = res;
        }
    );
}



addProductInShoppingCart(shoppingCartId: string, productId: number, selectedQuantity: number) {
    this.shoopingCartService.addProductInShoppingCart(shoppingCartId, productId, selectedQuantity).subscribe(
      () => {
        this.cartCounter += selectedQuantity;
      },
      (error) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }
}