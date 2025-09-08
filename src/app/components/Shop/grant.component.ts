import { Component } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { ShopService } from '../../core/services/shop/shop.service';
import { Product } from '../../dataType';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-grant',
  imports: [CommonModule,NgForOf, RouterLink],
  templateUrl: './grant.component.html',
  styleUrl: './grant.component.css',
})
export class GrantComponent {
  productList: undefined | Product[]
 
  constructor (private shopservice: ShopService){}

  ngOnInit(): void {
    this.shopservice.Product().subscribe((data) => {
      console.warn('Products loaded',data);
      this.productList = data.products;
    });
  }
  getDiscountedPrice(price: number, discount: number): number {
    const discounted = price - (price * discount) / 100;   //Formula of discount
    return parseFloat(discounted.toFixed(2));     // parseFloat => turns that string back into a number: 477.82
  }
}
