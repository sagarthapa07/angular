import { Component } from '@angular/core';
import { HomeServicesService } from '../../core/services/home/home-services.service';
import { CommonModule } from '@angular/common';
import { ShopService } from '../../core/services/shop/shop.service';

@Component({
  selector: 'app-grant',
  imports: [CommonModule, ],
  templateUrl: './grant.component.html',
  styleUrl: './grant.component.css',
})
export class GrantComponent {

    products: any[] = [];
  error: string = '';

  constructor(private productService: ShopService) {}

  async ngOnInit() {
    try {
      this.products = await this.productService.getAllProducts();
    } catch (err) {
      this.error = 'Unable to load products. Please try again later.';
      console.error(err);
    }
  }

  // activeForm: 'login' | 'register' = 'register'
  // total: number = 0; 

  // constructor(private home: HomeServicesService) {}
  //yha par humne home mai HomeServicesService ko inject kiya taki HomeServicesService k method ko use kar sake.

  // add(a: number, b: number) {
  //   this.total = this.home.add(a, b);
  // }
  // subtract(a: number, b: number) {
  //   this.total = this.home.subtract(a, b);
  // }
  // multiply(a: number, b: number) {
  //   this.total = this.home.multiply(a, b);
  // }
  // divide(a: number, b: number) {
  //   this.total = this.home.divide(a, b);
  // }
  // reset(){a
  //   this.total=0;
  // }
}
