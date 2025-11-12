import { Component } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { ShopService } from '../../core/services/shop/shop.service';
import { cart, Categories, Items, Product } from '../../dataType';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonService } from '../../core/services/common/common.service';



@Component({
  selector: 'app-grant',
  imports: [CommonModule,NgForOf, RouterLink],
  templateUrl: './grant.component.html',
  styleUrl: './grant.component.css',
})
export class GrantComponent {
  productList: undefined | Product[]
    total: number = 0;
    active = 1;
    beatyItem: undefined | Items[]
    furnitureItem: Items[] | undefined;
    othersItem: Items[] | undefined;
    allCategories: Categories[] = [];
    cartItem: any[] = []
    product!: Product;
    isInCart = true;
    userLogedIn = false;
    cartData: Product | undefined
    productQuantity: number = 1;
    productId: string | null = null;
  alertMessage: string = '';
  showPopup: boolean = false;
 
  constructor (private shopService: ShopService,
    private common: CommonService,
    private route: ActivatedRoute,
  
  ){}

  ngOnInit(): void {
    this.shopService.Product().subscribe((data) => {
      console.warn('Products loaded',data);
      this.productList = data.products;
    });
this.productId = this.route.snapshot.paramMap.get("id");

    if (this.productId) {
      this.shopService.getProduct(this.productId).subscribe((result) => {
        this.product = result;

        let cartData = localStorage.getItem('localCart');
        if (cartData) {
          let items = JSON.parse(cartData);
          items = items.filter((item: Product) => this.productId == item.id.toString());
          this.isInCart = items.length > 0;
        }

        let user = localStorage.getItem('user');
        if (user) {
          let userId = JSON.parse(user).id;
          this.shopService.getCartList(userId);
          this.shopService.cartData.subscribe((result) => {
            let item = result.filter((item: Product) => this.productId?.toString() === item.productId?.toString());
            if (item.length) {
              this.cartData = item[0];
              this.isInCart = true;
            }
          });
        }
      });
    }

    // this.loadCategoryData(this.active);
    // this.fetchAllCategories();
    this.loadCartState();

    
  }


    loadCartState() {

    // Guest user (no cookie)
    if (!this.common.getCookie('sagar')) {
      const localCart = localStorage.getItem('localCart');
      if (localCart) {
        const items = JSON.parse(localCart);

        //this.cartItemsIds = items.map((item: Product) => item.id);

        this.cartItem = items.map((item: Product) => {
          return {
            productId: item.productId,
            id: item.id

          }
        })
      }
    }

    // Logged-in user
    else {
      const user = this.common.getCookie('sagar');
      const userId = JSON.parse(user).id;

      this.shopService.getCartList(userId);

      this.shopService.cartData.subscribe((cartList) => {
        //  this.cartItemsIds = cartList.map((item: Product) => + item.productId);
        this.cartItem = cartList.map((item: Product) => {
          return {
            productId: item.productId,
            id: item.id

          }
        })
      });
    }
  }


  getDiscountedPrice(price: number, discount: number): number {
    const discounted = price - (price * discount) / 100;   //Formula of discount
    return parseFloat(discounted.toFixed(2));     // parseFloat => turns that string back into a number: 477.82
  }


  
    AddToCart(item: Items) {
    let productData: Product = {
      ...item,
      productId: item.id,
      quantity: 1,
      availabilityStatus: "In stock"
    };
  
    // 🟦 Guest user (not logged in)
    if (!this.common.getCookie('sagar')) {
      this.shopService.localAddToCart(productData);
  
      // update your local cart array (if used in component)
      this.cartItem = JSON.parse(localStorage.getItem('localCart') || '[]');
            this.showA("Added to cart!");
      return;
    }
  
    // 🟩 Logged in user (API)
    let user = this.common.getCookie('sagar');
    let userId = JSON.parse(user).id;
  
    let cartData: cart = {
      ...productData,
      userId
    };
  
    delete (cartData as any).id;
  
    this.shopService.addToCartAPI(cartData).subscribe(result => {
      if (result) {
        this.shopService.getCartList(userId);
              this.showA("Added to cart!");
      }
    });
  }
  
  removeToCart(productId: number) {
  
    let cartProduct = this.cartItem.filter((val) => val.productId == productId);
    const user = this.common.getCookie('sagar');
  
    if (user) {
  
      const userId = JSON.parse(user).id;
  
      this.shopService.removeToCart(cartProduct[0]?.id).subscribe((res) => {
        if (res) {
   
          this.cartItem = this.cartItem.filter((val) => val.productId !== cartProduct[0]?.productId);
          this.shopService.getCartList(userId);
          this.showA("Removed from cart!");
        }
      });
  
    } else {
  
      this.shopService.removeItemFromCart(cartProduct[0]?.productId);
  
  
      this.cartItem = this.cartItem.filter((val) => val.productId !== cartProduct[0]?.productId);
  
    
      const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
      this.shopService.cartData.emit(localCart);
      this.showA("Removed from cart!");
    }
  }

  isProductInCart(id: number) {
    return this.cartItem.some((val: any) => val.productId === id)
  }
    showA(message: string) {
    this.alertMessage = message;
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;   
    }, 2000); 
  }

}