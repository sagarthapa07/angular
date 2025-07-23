import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartApi:string = "https://dummyjson.com/carts/1"

 private _cartItems = signal<any[]>([]);

  // Public readonly signal
  readonly cartItems = this._cartItems;

  constructor(private http: HttpClient) {}

  fetchCartData(): void {
    this.http.get<any>(this.cartApi).subscribe((res) => {
      const data = res.products.map((item: any) => ({
        img: item.thumbnail,
        name: item.title,
        Variant: 'Default',
        status: 'In Stock',
        price: item.discountedPrice || item.total,
        quantity: item.quantity,
      }));
      this._cartItems.set(data); // Set signal value
    });
  }

  // Bonus: total amount computed signal
  totalAmount = computed(() =>
    this._cartItems().reduce((acc, item) => acc + item.price * item.quantity, 0)
  );









//   constructor(private http: HttpClient) {}

//   getCartData() {
//   return this.http.get<any>('https://dummyjson.com/carts/1');
// }



//   getCartData(): Observable<any[]> {
//   return new Observable((observer) => {
//     this.http.get<any>('https://dummyjson.com/carts/1').subscribe((res) => {
//       const cartItems = res.products.map((item: any) => {
//         return {
//           img: item.thumbnail,
//           name: item.title,
//           Variant: 'Default',
//           status: 'In Stock',
//           price: item.discountedPrice || item.total,
//           quantity: item.quantity,
//         };
//       });
//       observer.next(cartItems);
//       observer.complete();
//     });
//   });
// }
}
