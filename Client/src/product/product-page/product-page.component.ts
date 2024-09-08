import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from "../../services/product.service";
import {UserService} from "../../services/user.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import {Component, OnInit} from "@angular/core"; // Import pentru a accesa ruta activă

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  faCartShopping = faCartShopping;
  product: any; // Schimbă productsList cu un singur produs
  userName: string = "";
  shoppingCartId: string = "";
  cartCounter: number = 0;
  selectedQuantity: any;

  constructor(
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute, // Adaugă ActivatedRoute pentru a prelua productId din URL
    private userService: UserService,
    private shoopingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    // Preia productId din URL
    const productId = this.route.snapshot.paramMap.get('productId');

    // Fă cerere la API pentru a obține detaliile produsului
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

  // Modifică pentru a obține produsul pe baza productId
  getProductById(productId: any) {
    this.service.getProductById(productId).subscribe(
      (res: any) => {
        this.product = res; // Stochează doar produsul
      },
      (error) => {
        console.error('Error fetching product by ID:', error);
      }
    );
  }

  // Metodă pentru a adăuga produse în coșul de cumpărături
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
