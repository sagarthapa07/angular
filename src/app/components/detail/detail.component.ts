import { Component, numberAttribute } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ShopService } from '../../core/services/shop/shop.service';
import { cart, Product } from '../../dataType';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../core/services/login/login.service';
import { CommonService } from '../../core/services/common/common.service';



@Component({
  selector: 'app-detail',
  imports: [CommonModule, NgbCollapseModule, NgbNavModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  active = 1;
  isCollapsed = true;
  productId: string | null = null;
  product: Product | null = null;
  isInCart = false;
  userLogedIn = false;
  cartData: Product | undefined



  constructor(private shopService: ShopService, private route: ActivatedRoute, private common: CommonService) { }



  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get("id");

    if (this.productId) {
      this.shopService.getProduct(this.productId).subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (err) => {
          console.warn('Error fetching product:', err);
        }
      });
    }
    let cartData = localStorage.getItem('localCart');
    if (this.productId && cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((items: Product) => this.productId == items.id.toString())
      if (items.length) {
        this.isInCart = true
      } else {
        this.isInCart = false
      }
    }
    let user = this.common.getCookie('sagar');
    if (user) {
      let userId = JSON.parse(user).id
      this.shopService.getCartList(userId);
      this.shopService.cartData.subscribe((result) => {
        let items = result.filter((item: Product) => this.productId?.toString() === item.productId?.toString())
        if (items.length) {
          this.cartData = items[0];
          this.isInCart = true
        }
      })
    }
  }

  getDiscountedPrice(price: number, discount: number): number {
    const discounted = price - (price * discount) / 100;   //Formula of discount
    return parseFloat(discounted.toFixed(2));
  }

  AddToCart() {
    if (this.product) {
      if (!this.common.getCookie('sagar')) {
        this.shopService.localAddToCart(this.product);
        this.isInCart = true;
      }
      else {
        let user = this.common.getCookie('sagar');
        let userId = JSON.parse(user).id
        console.warn(userId);


        let cartData: cart = {
          ...this.product,
          userId,
          productId: this.product.id,
        }
    
        console.warn(cartData);

        delete cartData.id
        this.shopService.addTocart(cartData).subscribe((result) => {
          if (result) {
            this.shopService.getCartList(userId);
            this.isInCart = true;
          }
        })
      }
    }
  }

  removeToCart(productId: number) {
    if (!this.common.getCookie('sagar')) {
      this.shopService.removeItemFromCart(productId);
    } else {
      let user = this.common.getCookie('sagar');
      let userId = JSON.parse(user).id
      console.warn(this.cartData);
      this.cartData && this.shopService.removeToCart(this.cartData.id)
        .subscribe((result) => {
          if (result) {
            this.shopService.getCartList(userId)
          }
        })
      this.isInCart = false;
    }
  }
}
