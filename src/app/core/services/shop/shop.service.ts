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

  updateCart(productId:string, product: any) {
    return this.http.patch(this.apiUrl+ '/' +productId, product);
  }


  // LocalAddToCart(data: Product) {
  //   let cartData = [];
  //   let localCart = localStorage.getItem('cartProducts');
  //   if (!localCart) {
  //     localStorage.setItem('localCart', JSON.stringify([data]));
  //   }
  // }

  LocalAddToCart(data: Product) {
  let cartData: Product[] = [];
  let localCart = localStorage.getItem('localCart');

  if (!localCart) {
    // first item
    localStorage.setItem('localCart', JSON.stringify([data]));
    this.cartData.emit([data]);
  } else {
    cartData = JSON.parse(localCart);

    // ✅ check if product already exists
    const existing = cartData.find((item) => item.productId === data.productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cartData.push(data);
    }

    // ✅ save updated cart
    localStorage.setItem('localCart', JSON.stringify(cartData));

    // ✅ emit updated data for header
    this.cartData.emit(cartData);
  }
}


  loadLocalCart() {
  const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
  this.cartData.emit(localCart);
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

  addTocart(cartData: any) {
    return this.http.post('http://localhost:3000/cart', cartData)
  }

  // addTocart(id: number, quantity: number) {
  //   return this.http.post('http://localhost:3000/cart', { id, quantity });
  // }

  getCartList(userId: number) {

    this.http.get<Product[]>('http://localhost:3000/cart?userId=' + userId, { observe: 'response' }).subscribe((result) => {
      if (result && result.body) {
        this.cartData.emit(result.body);
      }
    })
  }
  removeToCart(cartId: number) {

    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }
  currentCart(userId: any) {
    let userStore = this.common.getCookie('sagar')
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id);
  }
  // searchProduct(query:string){
  //   return this.http.get<Product[]>(`https://dummyjson.com/products?q=${query}`);
  // }
  searchProduct(query: string) {
  return this.http.get<Product[]>(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`);
}
}
