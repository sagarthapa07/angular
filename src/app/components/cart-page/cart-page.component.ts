import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe, NgIf, NgFor } from "@angular/common";
import { ShopService } from '../../core/services/shop/shop.service';
import { CommonService } from '../../core/services/common/common.service';

@Component({
  selector: 'app-cart-page',
  imports: [RouterLink, NgIf, NgFor, DecimalPipe],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  cartData: any[] = [];
  subTotal: number = 0;
  totalDiscount: number = 0;
  grandTotal: number = 0;
  totalItems: number = 0;

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private shopservice: ShopService,
    private route: Router,
    private common: CommonService
  ) { }

  ngOnInit(): void {
    this.loadDetails();
  }

  //Load the cart from API or Local
  loadDetails() {
    const userCookie = this.common.getCookie('sagar');
    const isLoggedIn = !!userCookie;

    if (isLoggedIn) {
      const userId = JSON.parse(userCookie).id;

      this.shopservice.currentCart(userId).subscribe((result) => {

        this.cartData = result || [];
        console.log('Cart Data (API):', this.cartData);

        // Calculate totals
        this.calculateTotals();

        // If empty cart, redirect to cart page
        if (!this.cartData.length) {
          this.route.navigate(['/']);
        }
      });
    } else {
      //User not logged in
      const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');

      this.cartData = localCart;
      console.log('Cart Data (Local):', this.cartData);
      this.calculateTotals();
      if (!this.cartData.length) {
        this.route.navigate(['/']);
      }
    }
  }

  handleCounter(type: string, id: number, quantity: number) {
    const newQty = type === "plus" ? quantity + 1 : quantity - 1;
    // Remove if quantity becomes
    if (newQty < 1) {
      this.removeToCart(id);
      return;
    }
    const userCookie = this.common.getCookie('sagar');
    const isLoggedIn = !!userCookie;
    // Logged-in user → update via API
    if (isLoggedIn) {
      let item: any = this.cartData?.find((val) => val.id == id);
      if (item) {
        item.quantity = newQty;

        this.shopservice.updateCart(id + "", item).subscribe((res: any) => {
          if (res) {
            this.cartData = this.cartData.map((val) =>
              id === val.id ? { ...val, quantity: res.quantity } : val
            );
            this.calculateTotals();
          }
        });
      }
    }
    // Guest (Logout) user → Update Local Storage
    else {
      // Find the product in local cart array
      let item = this.cartData.find((p) => p.id === id);
      if (item) {
        item.quantity = newQty;
      }
      this.cartData = this.cartData.map((val) =>
        val.id === id ? { ...val, quantity: newQty } : val
      );
      localStorage.setItem('localCart', JSON.stringify(this.cartData));
      this.shopservice.cartData.emit(this.cartData);
      this.calculateTotals();
    }
  }


  removeToCart(productId: number) {
    if (!this.common.getCookie('sagar')) {
      this.shopservice.removeItemFromCart(productId);
      this.cartData = this.cartData.filter((item) => item.id !== productId);
    } else {
      let user = this.common.getCookie('sagar');
      let userId = JSON.parse(user).id;

      this.shopservice.removeToCart(productId).subscribe((result) => {
        if (result) {
          this.shopservice.getCartList(userId);
          this.loadDetails();
        }
      });
    }
    this.calculateTotals();
  }

  calculateTotals() {
    this.subTotal = 0;
    this.totalDiscount = 0;
    this.grandTotal = 0;
    this.totalItems = 0;
    if (!this.cartData.length) return;
    this.cartData.forEach((item) => {
      const price = item.price || 0;
      const discount = item.discountPercentage || 0;
      const qty = item.quantity || 1;
      const discountedPrice = price - (price * discount) / 100;
      this.subTotal += price * qty;
      this.totalDiscount += (price * discount * qty) / 100;
      this.grandTotal += discountedPrice * qty;
      this.totalItems += qty;
    });
    console.log('Subtotal:', this.subTotal);
    console.log('Discount:', this.totalDiscount);
    console.log('GrandTotal:', this.grandTotal);
  }

  resetCart() {
    const userCookie = this.common.getCookie('sagar');
    const isLoggedIn = !!userCookie;
    if (isLoggedIn) {
      const userId = JSON.parse(userCookie).id;
      this.shopservice.currentCart(userId).subscribe((result) => {
        if (result && result.length > 0) {
          result.forEach((item: any) => {
            this.shopservice.removeToCart(item.id).subscribe();
          });
        }
        this.cartData = [];
        this.calculateTotals();
        this.shopservice.getCartList(userId);
      });
    } else {
      localStorage.removeItem('localCart');
      this.cartData = [];
      this.calculateTotals();
      this.shopservice.cartData.emit([]);
    }
    console.log("All cart items removed!");
  }


  procedTOCheckOut(){
    const userCookie = this.common.getCookie('sagar');
    const isLoggedIn = !!userCookie;

    if(userCookie){
      this.route.navigate(['/checkout'])
    }else{
this.route.navigate(['/Login'])
    }
  }
}
