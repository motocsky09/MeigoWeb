import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from "../../services/product.service";
import {UserService} from "../../services/user.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import {Component, OnInit} from "@angular/core"; 
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  faCartShopping = faCartShopping;
  product: any; 
  userName: string = "";
  shoppingCartId: string = "";
  cartCounter: number = 0;
  selectedQuantity: any;
  mainImage: string = ''; 

  constructor(
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute, 
    private location: Location, 
    private userService: UserService,
    private shoopingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      this.getProductById(productId);
    }

    if (localStorage.getItem('token') != null) {
      this.userService.getUserName().subscribe(
        (res: string) => {
          this.userName = res;
          this.userService.getShoppingCartIdByUserName(this.userName).subscribe(
            (res: string) => {
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
  goBack() {
    this.location.back(); 
  }

  showBackButton(): boolean {
    return this.router.url !== '/home' && window.innerWidth <= 768; 
  }
  
  getProductById(productId: any) {
    this.service.getProductById(productId).subscribe(
      (res: any) => {
        this.product = res; 
        this.mainImage = this.product.imagePath1;
      },
      (error) => {
        console.error('Error fetching product by ID:', error);
      }
    );
  }

  
  changeMainImage(newImagePath: string) {
    this.mainImage = newImagePath; 
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

  increaseQuantity(quantityInput: HTMLInputElement) {
    const currentValue = quantityInput.valueAsNumber || 1;
    quantityInput.value = (currentValue + 1).toString();
  }

  decreaseQuantity(quantityInput: HTMLInputElement) {
    const currentValue = quantityInput.valueAsNumber || 1;
    if (currentValue > 1) {
      quantityInput.value = (currentValue - 1).toString();
    }
  }
}
