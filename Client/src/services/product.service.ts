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
     getProductBySize(size: string) {
      const params = new HttpParams()
        .set('size', size);
      return this.http.get(this.BaseURI + '/Product/GetProductBySize', { params });
    }
      getProductByColor(color: string) {
        const params = new HttpParams()
          .set('color', color);
        return this.http.get(this.BaseURI + '/Product/GetProductByColor', { params });
      }
      getProductBySeason(season: string) {
        const params = new HttpParams()
          .set('season', season);
        return this.http.get(this.BaseURI + '/Product/GetProductBySeason', { params });
      }
      getProductByGender(gender: string){
        const params = new HttpParams()
        .set('gender',gender);
        return this.http.get(this.BaseURI + '/Product/GetProductByGender', { params });
      }
      getProductByMaterial(material: string){
        const params = new HttpParams()
        .set('material',material);
        return this.http.get(this.BaseURI + '/Product/GetProductByMaterial', { params });
      }

  getProductById(productId: number) {
    return this.http.get<any>(`${this.BaseURI}/Product/GetProductById`, {
      params: new HttpParams().set('productId', productId.toString())
    });
  }

  getProducts() {
    return this.http.get(`${this.BaseURI}/Product/GetProducts`);
  }

createProduct(productData: FormData) {
  return this.http.post(`${this.BaseURI}/Product/CreateProduct`, productData);
}

updateProduct(productData: any) {
  return this.http.put(`${this.BaseURI}/Product/UpdateProduct`, productData, {
    headers: { 'Content-Type': 'application/json' }
  });
}

uploadProductWithImages(formData: FormData) {
  return this.http.post(`${this.BaseURI}/Product/UploadProductWithImages`, formData);
}

  deleteProduct(productId: number) {
    const params = new HttpParams().set('productId', productId.toString());
    return this.http.delete(`${this.BaseURI}/Product/DeleteProduct`, { params });
  }

  createCategory(category: any) {
  return this.http.post(`${this.BaseURI}/Category/CreateCategory`, category);
}

getCategories() {
  return this.http.get(`${this.BaseURI}/Category/GetCategories`);
}

updateCategory(category: any) {
  return this.http.put(`${this.BaseURI}/Category/UpdateCategory`, category);
}

deleteCategory(categoryId: number) {
  const params = new HttpParams().set('categoryId', categoryId.toString());
  return this.http.delete(`${this.BaseURI}/Category/DeleteCategory`, { params });
}

}
