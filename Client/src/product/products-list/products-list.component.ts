import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/services/user.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { Location } from '@angular/common';

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

  // Variabilă pentru controlul vizibilității filtrelor
  areFiltersVisible: boolean = false;

  selectedCategoryId: number | null = null;
  products: any;

  constructor(
    private service: ProductService,
    private router: Router,
    private location: Location, // Importă Location pentru a naviga înapoi
    private userService: UserService,
    private shopingCartService: ShoppingCartService
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
              this.shopingCartService.getShoppingCartListById(this.shoppingCartId).subscribe(
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
    this.location.back(); // Navighează înapoi
  }

  showBackButton(): boolean {
    return this.router.url !== '/home' && window.innerWidth <= 768; // Afișează doar pe mobile și în afara paginii home
  }
  // Metodă pentru a obține toate produsele
  getProductsList(){
    this.service.getProductsList().subscribe(
      (res:any) => {
        this.productsList = res;
      }
    );
  }

  // Metodă pentru a obține produsele pe baza categoriei
  getProductsListByCategoryId(categoryId: any){
    this.service.getProductsListByCategoryId(categoryId).subscribe(
      (res:any) => {
        this.productsList = res;
      }
    );
  }

  // Metodă pentru a adăuga produse în coșul de cumpărături
  addProductInShoppingCart(shoppingCartId: string, productId: number, selectedQuantity: number) {
    this.shopingCartService.addProductInShoppingCart(shoppingCartId, productId, selectedQuantity).subscribe(
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

  selectedCategories: string[] = [];
minPrice: number | null = null;
maxPrice: number | null = null;
onlyInStock: boolean = false;
selectedRatings: number[] = [];

toggleCategory(categoryId: number) {
  if (this.selectedCategoryId === categoryId) {
    this.selectedCategoryId = null;
    this.getProductsList(); // sau this.productsList = []; dacă vrei doar să golești
  } else {
    this.selectedCategoryId = categoryId;
    this.service.getProductsListByCategoryId(categoryId).subscribe(products => {
      this.productsList = products;
    });
  }
}

toggleColor(color: string) {
  this.service.getProductByColor(color).subscribe(products => {
    this.productsList = products;
  });
}

toggleSize(size: string) {
  this.service.getProductBySize(size).subscribe(products => {
    this.productsList = products;
  });
}
toggleRating(stars: number) {
  const index = this.selectedRatings.indexOf(stars);
  if (index > -1) {
    this.selectedRatings.splice(index, 1);
  } else {
    this.selectedRatings.push(stars);
  }
  this.filterProducts();
}

resetFilters() {
  this.selectedCategories = [];
  this.minPrice = null;
  this.maxPrice = null;
  this.onlyInStock = false;
  this.selectedRatings = [];
  this.filterProducts();
}

filterProducts() {
  // Logica de filtrare a produselor în funcție de cele selectate
}
}
