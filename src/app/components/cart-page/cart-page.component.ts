import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
 
  count = 1;

  // handleIncrement(){
  //   this.count=this.count+1
  // }

  //   handleDecrement(){
  //   this.count=this.count-1
  // }

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


  
  cartArr = [
    {
      prodID: 1,
      img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2Fc6e0da93e884e6ab9fc7b2a884c6d28ad7f2020e-500x500.png&w=750&q=75',
      name:'Canon EOS 250D 24.1MP Full HD WI-FI DSLR Camera with 18-55mm',
      Variant: 'Gadget',
      status: 'Sale',
      price: 750.00,
    },
    {
      prodID: 1,
      img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2Fc6e0da93e884e6ab9fc7b2a884c6d28ad7f2020e-500x500.png&w=750&q=75',
      name:'Canon EOS 250D 24.1MP Full HD WI-FI DSLR Camera with 18-55mm',
      Variant: 'Gadget',
      status: 'Sale',
      price: 750.00,
    },
    {
      prodID: 1,
      img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2Fc6e0da93e884e6ab9fc7b2a884c6d28ad7f2020e-500x500.png&w=750&q=75',
      name:'Canon EOS 250D 24.1MP Full HD WI-FI DSLR Camera with 18-55mm',
      Variant: 'Gadget',
      status: 'Sale',
      price: 750.00,
    },
    {
      prodID: 1,
      img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2Fc6e0da93e884e6ab9fc7b2a884c6d28ad7f2020e-500x500.png&w=750&q=75',
      name:'Canon EOS 250D 24.1MP Full HD WI-FI DSLR Camera with 18-55mm',
      Variant: 'Gadget',
      status: 'Sale',
      price: 750.00,
    },
    {
      prodID: 1,
      img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2Fc6e0da93e884e6ab9fc7b2a884c6d28ad7f2020e-500x500.png&w=750&q=75',
      name:'Canon EOS 250D 24.1MP Full HD WI-FI DSLR Camera with 18-55mm',
      Variant: 'Gadget',
      status: 'Sale',
      price: 750.00,
    },
  ]
}
