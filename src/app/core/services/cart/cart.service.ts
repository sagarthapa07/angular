import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { LoginService } from '../login/login.service';
import { cart, Product } from '../../../dataType';
import { Observable } from 'rxjs';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartApi: string = '';

  userdata: any = {}
  private _cartItems = signal<any[]>([]);

  // Public readonly signal
  readonly cartItems = this._cartItems;

  constructor(private http: HttpClient, private loginService: LoginService, private common: CommonService) { }

  fetchCartData() {
    let user = this.loginService.getUserData();
    this.userdata = JSON.parse(user);
    this.cartApi = 'https://dummyjson.com/carts/' + this.userdata.id;
    return this.http.get<any>(this.cartApi)
  }

  // total amount computed signal
  totalAmount = computed(() =>
    this._cartItems().reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  addItemsApi = 'http://localhost:3000/cart';

  cartAddItem(P_id: number, P_quantity: number) {
    const body = {
      userId: this.userdata.id,
      products: [
        {
          id: P_id,
          quantity: P_quantity,
        },
      ],
    };

    return this.http.post(this.addItemsApi, body);
  }



  updateCartItems(items: any[]) {
    this._cartItems.set(items);
  }




  private apiUrl = 'http://localhost:3000/cart';
  getCartFromLocalStorage() {
    const cartData = localStorage.getItem('cartProducts');
    return cartData ? JSON.parse(cartData) : [];
  }


  sendCartToServer(): Observable<any> {
    const cartProducts = this.getCartFromLocalStorage();
    return this.http.post(this.apiUrl, cartProducts);
  }



  currentCart() {
    let userStore = this.common.getCookie('sagar')
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id);
  }





}
