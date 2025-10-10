import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CartService } from '../../core/services/cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { NgIf } from "@angular/common";
@Component({
  selector: 'app-cart-page',  
  imports: [RouterLink, NgIf],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  cartArr: any[] = [];
  total: any;
  cartProducts: any[] = [];

  constructor(private cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.cartService.fetchCartData().subscribe((res) => {
      const data = res.products.map((item: any) => ({
        id: item.id,
        img: item.thumbnail,
        name: item.title,
        Variant: 'Default',
        status: 'In Stock',
        price: item.discountedPrice || item.total,
        quantity: item.quantity,
      }));
      this.cartArr = data;
    });
  }

  handleCounter(type: string, id: string, quantity: number) {
    const qty = type === 'plus' ? quantity + 1 : quantity - 1;
    this.cartService.cartAddItem(id, qty).subscribe((res: any) => {
      if (res) {
        this.cartArr = this.cartArr.map((val) => {
          if (id == val.id) {
            return {
              ...val,
              quantity: res.products[0].quantity
            }
          }
          return val
        })
      }
    });
  }
  price(id: string, quantity: number, price: number) {
    this.cartService.cartAddItem(id, price).subscribe((resPrice: any) => {
    })
  }
}
