import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { NgIf } from "@angular/common";
import { cart } from '../../dataType';
import { ShopService } from '../../core/services/shop/shop.service';
import { CommonService } from '../../core/services/common/common.service';
@Component({
  selector: 'app-cart-page',
  imports: [RouterLink, NgIf],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  cartData: any[] = [];
  total: any;
  cartProducts: any[] = [];
  productQuantity: number = 1;


  constructor(private cartService: CartService, private http: HttpClient, private shopservice: ShopService, private route: Router, private common: CommonService) { }

  handleCounter(type: string, id: number, quantity: number) {
    const qty = type === "plus" ? quantity + 1 : quantity - 1;
    let item: any = this.cartData?.filter((val) => val.id == id)
    item[0].quantity = qty

  
    this.shopservice.updateCart(id +"", item[0]).subscribe((res: any) => {
      if (res) {
     
        this.cartData = this.cartData.map((val) =>
          id === val.id ? { ...val, quantity: res.quantity } : val
        );

      }
    });
  }


  price(id: number, quantity: number, price: number) {
    this.cartService.cartAddItem(id, price).subscribe((resPrice: any) => {
    });
  }

  ngOnInit(): void {
    this.loadDetails();
  }

  loadDetails() {
    this.shopservice.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;

      result.forEach((item) => {
        if (item) {

        }
      })
      if (!this.cartData.length) {
        this.route.navigate(['/'])
      }
    });
  }

  removeToCart(productId: number) {
    if (!this.common.getCookie('sagar')) {
      // Agar user login nahi hai → local cart se item delete karo
      this.shopservice.removeItemFromCart(productId);
    } else {
      // User login hai → backend se delete karna hai
      let user = this.common.getCookie('sagar');
      let userId = JSON.parse(user).id;

      // productId yahan use karna hai (HTML se aaya)
      this.shopservice.removeToCart(productId).subscribe((result) => {
        if (result) {
          this.shopservice.getProduct(userId); // cart list refresh
          this.loadDetails();
        }
      });
    }
  }
}

