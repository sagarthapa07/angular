import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-cart-page',
  imports: [RouterLink, HeaderComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
 
  count = 1;

  handleCounter(val: string) { 
    if(val == 'sub') {
      if(this.count > 0){
        this.count = this.count-1
      }else{
        this.count=0
      }
    }else if (val == 'plus'){
      this.count = this.count+1
    }else{
      this.count = 0
    }
  }
  cartService = inject(CartService);
  cartArr = this.cartService.cartItems;
  total = this.cartService.totalAmount;

  constructor() {
    // call API on component load
    this.cartService.fetchCartData();
  }


//   ngOnInit(): void {
//   this.cartService.getCartData().subscribe((res) => {
//     this.cartService = res.products.map((item: any) => ({
//       img: item.thumbnail,
//       name: item.title,
//       Variant: 'Default',
//       status: 'In Stock',
//       price: item.discountedPrice || item.total,
//       quantity: item.quantity,
//     }));
//   });
// }
  
  // cartArr = [
  //   {
  //     prodID: 1,
  //     img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2Fc6e0da93e884e6ab9fc7b2a884c6d28ad7f2020e-500x500.png&w=750&q=75',
  //     name:'Canon EOS 250D 24.1MP Full HD WI-FI DSLR Camera with 18-55mm',
  //     Variant: 'Gadget',
  //     status: 'Sale',
  //     price: 750.00,
  //   },
  //   {
  //     prodID: 1,
  //     img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2Fc6e0da93e884e6ab9fc7b2a884c6d28ad7f2020e-500x500.png&w=750&q=75',
  //     name:'Canon EOS 250D 24.1MP Full HD WI-FI DSLR Camera with 18-55mm',
  //     Variant: 'Gadget',
  //     status: 'Sale',
  //     price: 750.00,
  //   },
  //   {
  //     prodID: 1,
  //     img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2Fc6e0da93e884e6ab9fc7b2a884c6d28ad7f2020e-500x500.png&w=750&q=75',
  //     name:'Canon EOS 250D 24.1MP Full HD WI-FI DSLR Camera with 18-55mm',
  //     Variant: 'Gadget',
  //     status: 'Sale',
  //     price: 750.00,
  //   },
  //   {
  //     prodID: 1,
  //     img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2Fc6e0da93e884e6ab9fc7b2a884c6d28ad7f2020e-500x500.png&w=750&q=75',
  //     name:'Canon EOS 250D 24.1MP Full HD WI-FI DSLR Camera with 18-55mm',
  //     Variant: 'Gadget',
  //     status: 'Sale',
  //     price: 750.00,
  //   },
  //   {
  //     prodID: 1,
  //     img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2Fc6e0da93e884e6ab9fc7b2a884c6d28ad7f2020e-500x500.png&w=750&q=75',
  //     name:'Canon EOS 250D 24.1MP Full HD WI-FI DSLR Camera with 18-55mm',
  //     Variant: 'Gadget',
  //     status: 'Sale',
  //     price: 750.00,
  //   },
  // ]
}
