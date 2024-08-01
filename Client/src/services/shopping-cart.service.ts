import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private fb:FormBuilder,
    private http:HttpClient,
    private router:Router
  ) {

   }

   readonly BaseURI = 'http://localhost:5098/api';
  
   createFirstShoppingCartByUsername(userName:string)
   {
    let body = new HttpParams({
      fromObject : {
        'userName' : userName
      }
    })
     return this.http.post(this.BaseURI+'/ShoppingCart/CreateFirstShoppingCartByUsername?userName=' + userName,body);
   }

    addProductInShoppingCart(shoppingCartId: string, productId: number, selectedQuantity: number)
    {  
       let body = new HttpParams({
         fromObject : {
          'shoppingCartId' : shoppingCartId,
          'productId' : productId,
          'selectedQuantity' : selectedQuantity
         }
       })
       return this.http.post(this.BaseURI+'/ShoppingCart/AddProductInShoppingCart?shoppingCartId=' 
        + shoppingCartId + "&productId=" + productId + "&selectedQuantity=" + selectedQuantity, body);
    }

   getShoppingCartListById(shoppingCartId:string)
   {
     return this.http.get(this.BaseURI+'/ShoppingCart/GetShoppingCartListById?shoppingCartId=' + shoppingCartId);
   }

   getProdutsFromShoppingById(shoppingCartId:string)
   {
     return this.http.get(this.BaseURI+'/ShoppingCart/GetProdutsFromShoppingById?shoppingCartId=' + shoppingCartId);
   }

   getCountProductsFromCartShopping(shoppingCartId:string)
   {
     return this.http.get(this.BaseURI+'/ShoppingCart/GetCountProductsFromCartShopping?shoppingCartId=' + shoppingCartId);
   }

   createOrder(shoppingCartId:string, sumDelivery:number, totalSumWithDelivery: number)
   {
    let body = new HttpParams({
      fromObject : {
        'shoppingCartId' : shoppingCartId,
        'sumDelivery' : sumDelivery,
        'totalSumWithDelivery' : totalSumWithDelivery
      }
    })
     return this.http.post(this.BaseURI+'/Order/CreateOrder?shoppingCartId=' + shoppingCartId
      + "&sumDelivery=" + sumDelivery + "&totalSumWithDelivery=" + totalSumWithDelivery, body);
   }
}
