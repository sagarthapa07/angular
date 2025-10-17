import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { NgIf } from "@angular/common";
import { cart } from '../../dataType';
import { ShopService } from '../../core/services/shop/shop.service';
@Component({
  selector: 'app-cart-page',
  imports: [RouterLink, NgIf],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  total: any;
  cartProducts: any[] = [];
  productQuantity: number = 1;

  constructor(private cartService: CartService, private http: HttpClient, private shopservice: ShopService, private route: Router) { }

  // ngOnInit(): void {
  //   this.cartService.fetchCartData().subscribe((res) => {
  //     const data = res.products.map((item: any) => ({
  //       id: item.id,
  //       img: item.thumbnail,
  //       name: item.title,
  //       Variant: 'Default',
  //       status: 'In Stock',
  //       price: item.discountedPrice || item.total,
  //       quantity: item.quantity,
  //     }));
  //     this.cartArr = data;
  //   });
  // }
  // handleCounter(type: string, id: number, quantity: number) {
  //   const qty = type === 'plus' ? quantity + 1 : quantity - 1;

  //   this.cartService.cartAddItem(id, qty).subscribe((res: any) => {
  //     if (res) {
  //       this.cartData = this.cartProducts.map((val) => {
  //         if (id === val.id) {
  //           return {
  //             ...val,
  //             quantity: res.products[0].quantity
  //           };
  //         }
  //         return val;
  //       });
  //     }
  //   });
  // }


  handleQuantity(type: string,id:string,quantity:number,) {
    const qty = type === "plus" ? this.productQuantity + 1 : quantity-1;
    this.shopservice.
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
      //result.forEach((item) => {
      // if (item.) {
      // price += +item.price * +item.quantity;
      //  }
      //});

      // this.priceSummary.price = price;
      // this.priceSummary.discount = price / 10;
      // this.priceSummary.tax = price / 10;
      // this.priceSummary.delivery = 40;

      // Correct total calculation
      // this.priceSummary.total = price + this.priceSummary.tax + this.priceSummary.delivery - this.priceSummary.discount;


      if (!this.cartData.length) {
        this.route.navigate(['/'])
      }

    });
  }

}
