import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ShopService } from '../../core/services/shop/shop.service';
import { cart, Product } from '../../dataType';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-detail',
  imports: [RouterLink, CommonModule, NgbCollapseModule, NgbNavModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  active = 1;
  isCollapsed = true;
  productId: string | null = null;
  product: Product | null = null;
  removeCart = false;



  constructor(private shopService: ShopService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get("id");

    if (this.productId) {
      this.shopService.getProduct(this.productId).subscribe({
        next: (data) => {
          this.product = data;
          console.warn('Product:', this.product);
        },
        error: (err) => {
          console.warn('Error fetching product:', err);
        }
      });
    }
    let cartData = localStorage.getItem('cartProducts');
    if(this.productId && cartData){
      let items= JSON.parse(cartData);
      items = items.filter((items:Product)=>this.productId==items.id.toString())
      if(items.length){
        this.removeCart=true
      }else{
        this.removeCart=false
      }
    }
  }

  getDiscountedPrice(price: number, discount: number): number {
    const discounted = price - (price * discount) / 100;   //Formula of discount
    return parseFloat(discounted.toFixed(2));     // parseFloat => turns that string back into a number: 477.82
  }


  AddToCart() {
    if (this.product) {
      // LocalStorage se existing cart products nikaalo
      let cartProducts = localStorage.getItem('cartProducts');
      let productsArray = cartProducts ? JSON.parse(cartProducts) : [];

      let found = productsArray.find((p: any) => p.id === this.product?.id);
      if (!found) {
        productsArray.push(this.product);
        localStorage.setItem('cartProducts', JSON.stringify(productsArray));
        this.removeCart = true
        this.shopService.addToCartAPI(this.product).subscribe({
          next: (res) => {
            console.log('Product successfully sent to API:', res);
          },
          error: (err) => {
            console.error('Error sending product to API:', err);
          }
        })
      }
    }
  }
  removeToCart(productId:number) {
    let cartProducts = localStorage.getItem('cartProducts');
    if (cartProducts) {
      let productsArray = JSON.parse(cartProducts);
      productsArray = productsArray.filter((p: any) => p.id !== this.product?.id);
      localStorage.setItem('cartProducts', JSON.stringify(productsArray));
      this.removeCart = false;
    }
  }
}