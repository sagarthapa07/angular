import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../../../dataType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  cartData = new EventEmitter<Product[]>();


  constructor(private http: HttpClient) { }
  Product(): Observable<{ products: Product[] }> {
    return this.http.get<{ products: Product[] }>('https://dummyjson.com/products');
  }


  getProduct(id: string) {
    return this.http.get<Product>(`https://dummyjson.com/products/${id}`)
  };





  private apiUrl = 'http://localhost:3000/cart';
  addToCartAPI(product: any) {
    return this.http.post(this.apiUrl, product);
  }



  LocalAddToCart(data: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('cartProducts');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    }
  }

localAddToCart(data: Product) {
    let cartData: Product[] = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data])
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
    //ye subscribe kar sakte hai
  }


  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      console.warn(cartData);
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product) => productId !== item.id)
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

}