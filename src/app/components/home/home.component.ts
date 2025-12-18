import { Component } from '@angular/core';
import { HomeServicesService } from '../../core/services/home/home-services.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { cart, Categories, Items, Product, wishlist } from '../../dataType';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgForOf, NgIf, NgClass } from '@angular/common';
import { ShopService } from '../../core/services/shop/shop.service';
import { CommonService } from '../../core/services/common/common.service';

@Component({
  selector: 'app-home',
  imports: [NgbNavModule, RouterLink, NgForOf, NgIf, NgClass],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  total: number = 0;
  active = 1;

  productList: undefined | Items[];
  beatyItem: undefined | Items[];
  furnitureItem: Items[] | undefined;
  othersItem: Items[] | undefined;
  allCategories: Categories[] = [];

  product!: Product;
  isInCart = true;
  userLogedIn = false;
  cartData: Product | undefined;
  productQuantity: number = 1;
  productId: string | null = null;
  // cartItemsIds: number[] = [];
  cartItem: any[] = [];
  alertMessage: string = '';
  showPopup: boolean = false;

  // Wishlist
  wishlistIds: number[] = [];
  wishlistData: wishlist[] = [];

  constructor(
    private homeService: HomeServicesService,
    private home: HomeServicesService,
    private shopService: ShopService,
    private common: CommonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.shopService.getProduct(this.productId).subscribe((result) => {
        this.product = result;

        let cartData = localStorage.getItem('localCart');
        if (cartData) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (item: Product) => this.productId == item.id.toString()
          );
          this.isInCart = items.length > 0;
        }

        let user = localStorage.getItem('user');
        if (user) {
          let userId = JSON.parse(user).id;
          this.shopService.getCartList(userId);
          this.shopService.cartData.subscribe((result) => {
            let item = result.filter(
              (item: Product) =>
                this.productId?.toString() === item.productId?.toString()
            );
            if (item.length) {
              this.cartData = item[0];
              this.isInCart = true;
            }
          });
        }
      });
    }

    this.loadCategoryData(this.active);
    this.fetchAllCategories();
    this.loadCartState();
    this.loadWishlist();
  }
  onTabChange(tabId: number): void {
    this.active = tabId;
    this.loadCategoryData(tabId);
  }
  loadCategoryData(tabId: number): void {
    switch (tabId) {
      case 1:
        this.homeService.smartPhonesItems().subscribe((data) => {
          console.warn('Smartphone Products loaded', data);
          this.productList = data.products.slice(0, 10);
        });
        break;
      case 2:
        this.homeService.beautyItem().subscribe((data) => {
          console.warn('Beauty Products loaded', data);
          this.beatyItem = data.products;
        });
        break;

      case 3:
        this.homeService.furnitureItem().subscribe((data) => {
          console.warn('Furniture Products loaded', data);
          this.furnitureItem = data.products;
        });
        break;

      case 4:
        this.homeService.groceriesItem().subscribe((data) => {
          console.warn('Groceries Products loaded', data);
          this.othersItem = data.products.slice(0, 10);
        });
        break;
    }
  }

  fetchAllCategories(): void {
    this.homeService.getCategories().subscribe((categories) => {
      this.allCategories = categories.slice(0, 6);
    });
  }

  getDiscountedPrice(price: number, discount: number): number {
    const discounted = price - (price * discount) / 100; //Formula of discount
    return parseFloat(discounted.toFixed(2)); // parseFloat => turns that string back into a number: 477.8
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
            id: item.id,
          };
        });
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
            id: item.id,
          };
        });
      });
    }
  }

  AddToCart(item: Items) {
    let productData: Product = {
      ...item,
      productId: item.id,
      quantity: 1,
      availabilityStatus: 'In stock',
    };

    // Guest user (not logged in)
    if (!this.common.getCookie('sagar')) {
      this.shopService.localAddToCart(productData);

      // update your local cart array (if used in component)
      this.cartItem = JSON.parse(localStorage.getItem('localCart') || '[]');
      this.showA('Added to cart!');
      return;
    }

    // Logged in user (API)
    let user = this.common.getCookie('sagar');
    let userId = JSON.parse(user).id;

    let cartData: cart = {
      ...productData,
      userId,
    };

    delete (cartData as any).id;
    this.shopService.addToCartAPI(cartData).subscribe((result) => {
      if (result) {
        this.shopService.getCartList(userId);
      }
    });
    this.showA('Added to cart!');
  }

  removeToCart(productId: number) {
    let cartProduct = this.cartItem.filter((val) => val.productId == productId);
    const user = this.common.getCookie('sagar');

    if (user) {
      const userId = JSON.parse(user).id;

      this.shopService.removeToCart(cartProduct[0]?.id).subscribe((res) => {
        if (res) {
          this.cartItem = this.cartItem.filter(
            (val) => val.productId !== cartProduct[0]?.productId
          );

          this.shopService.getCartList(userId);
          this.showA('Removed from cart!');
        }
      });
    } else {
      this.shopService.removeItemFromCart(cartProduct[0]?.productId);

      this.cartItem = this.cartItem.filter(
        (val) => val.productId !== cartProduct[0]?.productId
      );

      const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
      this.shopService.cartData.emit(localCart);
      this.showA('Removed from cart!');
    }
  }

  showA(message: string) {
    this.alertMessage = message;
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
    }, 5000);
  }

  isProductInCart(id: number) {
    return this.cartItem.some((val: any) => val.productId === id);
  }








  loadWishlist() {
    this.shopService.getWishlist().subscribe((res) => {
      this.wishlistData = res;
      this.wishlistIds = res.map((w) => w.productId);
    });
  }

  isWishlisted(productId: number): boolean {
    return this.wishlistIds.includes(productId);
  }
  toggleWishlist(item: Items): void {
    if (this.isWishlisted(item.id)) {
      this.removeFromWishlist(item.id);
    } else {
      this.addToWishlist(item.id);
    }
  }
  addToWishlist(productId: number): void {
    if (this.isWishlisted(productId)) {
      return;
    }

    this.shopService.addWishlist({ productId }).subscribe(() => {
      this.loadWishlist();
      this.showA('Added to wishlist!');
    });
  }
  removeFromWishlist(productId: number): void {
    const wishItem = this.wishlistData.find((w) => w.productId === productId);
    if (!wishItem?.id) return;
    this.shopService.removeWishlist(wishItem.id).subscribe(() => {
      this.loadWishlist();
      this.showA('Removed from wishlist!');
    });
  }
}
