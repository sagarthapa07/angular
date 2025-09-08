import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../../dataType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  constructor(private http:HttpClient){}
Product(): Observable<{ products: Product[] }> {
  return this.http.get<{ products: Product[] }>('https://dummyjson.com/products');
}


getProduct(id:string){
  return this.http.get<Product>(`https://dummyjson.com/products/${id}`)
}


}

// return this.http.get<{ products: Product[] }>('https://dummyjson.com/products?limit=12');