import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {Observable} from "rxjs";

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

  updateProductQuantity(shoppingCartId: string, productId: number, updatedQuantity: number) {
    // Construim URL-ul în formatul specificat
    const url = this.BaseURI + '/ShoppingCart/UpdateProductInShoppingCart?shoppingCartId='
      + shoppingCartId + '&productId=' + productId + '&updatedQuantity=' + updatedQuantity;

    // Returnăm cererea HTTP folosind metoda PUT
    return this.http.put(url, null); // Nu este nevoie de corpul cererii (null)
  }
   getShoppingCartListById(shoppingCartId:string)
   {
     return this.http.get(this.BaseURI+'/ShoppingCart/GetShoppingCartListById?shoppingCartId=' + shoppingCartId);
   }

   getProdutsFromShoppingById(shoppingCartId:string)
   {
     return this.http.get(this.BaseURI+'/ShoppingCart/GetProdutsFromShoppingById?shoppingCartId=' + shoppingCartId);
   }
  // Metoda pentru a șterge toate produsele din coș
  clearCart(): Observable<any> {
    return this.http.delete(this.BaseURI + '/ProductAddedShCart/DeleteProductAddedShCart');
  }
  removeProductFromCart(shoppingCartId: string, productId: number) {
    const url = `${this.BaseURI}/ShoppingCart/DeleteProductFromCart?shoppingCartId=${shoppingCartId}&productId=${productId}`;
    return this.http.delete(url);
  }
  createOrder(shoppingCartId: string, sumDelivery: number, totalSumWithDelivery: number) {
    const url = `${this.BaseURI}/Order/CreateOrder?shoppingCartId=${shoppingCartId}&sumDelivery=${sumDelivery}&totalSumWithDelivery=${totalSumWithDelivery}`;
    return this.http.post(url, null); // Nu este nevoie de HttpParams
}


}
