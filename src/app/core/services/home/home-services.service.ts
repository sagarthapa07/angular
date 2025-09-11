import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories, Items } from '../../../dataType';

@Injectable({
  providedIn: 'root',
})

export class HomeServicesService {
  constructor(private http: HttpClient) { }
  smartPhonesItems(): Observable<{ products: Items[] }> {
    return this.http.get<{ products: Items[] }>('https://dummyjson.com/products/category/smartphones');
  }
  beautyItem(): Observable<{ products: Items[] }> {
    return this.http.get<{ products: Items[] }>('https://dummyjson.com/products/category/beauty');
  }
  furnitureItem(): Observable<{ products: Items[] }> {
    return this.http.get<{ products: Items[] }>('https://dummyjson.com/products/category/furniture');
  }
  groceriesItem(): Observable<{ products: Items[] }> {
    return this.http.get<{ products: Items[] }>('https://dummyjson.com/products/category/groceries');
  }
  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>('https://dummyjson.com/products/categories?_limit=6');
  }

  getProductsByCategory(category: string): Observable<{ category: Categories[] }> {
    return this.http.get<{ category: Categories[] }>(`https://dummyjson.com/products/category/${category}`);
  }




  getProduct(id: string) {
    return this.http.get<Items>(`https://dummyjson.com/products/category/smartphones${id}`)
  }
}
