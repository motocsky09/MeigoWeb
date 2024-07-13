import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  faCartShopping = faCartShopping;

  productsList: any;
 
  constructor(
    private service:ProductService,
    private router:Router
  ) { }

  ngOnInit(){
    this.service.getProductsList().subscribe(
      (res:any)=>{
        this.productsList=res;
      console.log(this.productsList);
      }
    )
  }

  getProductsList(){
    this.service.getProductsList().subscribe(
      (res:any)=>{
        this.productsList=res;})
  }

  getProductsListByCategoryId(categoryId:any){
    this.service.getProductsListByCategoryId(categoryId).subscribe(
      (res:any)=>{
        this.productsList=res;})
  }
}
