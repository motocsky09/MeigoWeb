import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    constructor(
      private fb:FormBuilder,
      private http:HttpClient,
      private router:Router
    ) {

     }

     readonly BaseURI = 'http://localhost:5098/api';

     getProductsList()
     {
       return this.http.get(this.BaseURI+'/Product/GetProducts');
     }

     getProductsListByCategoryId(categoryId:any):any
     {
        const params = new HttpParams()
        .set('categoryId', categoryId)
       return this.http.get(this.BaseURI+'/Product/GetProductsByCategoryId',{params});
     }

  getProductById(productId: number) {
    return this.http.get<any>(`${this.BaseURI}/Product/GetProductById`, {
      params: new HttpParams().set('productId', productId.toString())
    });
  }


}
