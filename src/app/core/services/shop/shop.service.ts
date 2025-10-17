import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, Product } from '../../../dataType';
import { Observable } from 'rxjs';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  cartData = new EventEmitter<Product[]>();


  constructor(private http: HttpClient, private common: CommonService) { }


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
  addTocart(cartData:cart){
    return this.http.post('http://localhost:3000/cart',cartData)
  }

getCartList(userId:number){
this.http.get<Product[]>('http://localhost:3000/cart?userId='+userId,{observe:'response'}).subscribe((result)=>{
  console.warn(result);
  
  if(result && result.body){

    this.cartData.emit(result.body);
  }      
})
}
removeToCart(cartId:number){
  return this.http.delete('http://localhost:3000/cart/'+cartId)
}
 currentCart() {
    let userStore = this.common.getCookie('sagar')
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId='+userData.id);
  }
}