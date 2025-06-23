import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
 
  count = 0;

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
      
    },
  ]

}
