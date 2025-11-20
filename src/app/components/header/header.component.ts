import { AfterViewInit, Component, effect, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../core/services/login/login.service';
import { CommonModule } from '@angular/common';
import { ShopService } from '../../core/services/shop/shop.service';
import { CommonService } from '../../core/services/common/common.service';
import { Product } from '../../dataType';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isLoggedIn: boolean = false;
  cartItems = 0;
  menuType: string = 'default';
  searchResult: Product[] | undefined;

  constructor(
    private login: LoginService,
    private shopService: ShopService,
    private common: CommonService,
    private route: Router
  ) {
    effect(() => {
      this.isLoggedIn = this.login.isLogin()();
    });
  }
  ngOnInit() {
    this.shopService.cartData.subscribe((result) => {
      if (result) {
        this.cartItems = result.length;
      }
    });
    window.addEventListener('storage', () => {
      const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
      this.shopService.cartData.emit(localCart);
    });

    
  }

  ngAfterViewInit(): void {
    if (this.isLoggedIn) {
      const user = this.common.getCookie('sagar');
      if (user) {
        const userId = JSON.parse(user).id;
        this.shopService.getCartList(userId);
      }
    } else {
      const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
      this.shopService.cartData.emit(localCart);
    }
  }

  logout() {
    this.cartItems = 0;
    this.shopService.cartData.emit([]);
    this.login.logOutUser();
  }
  // searchProduct(query: KeyboardEvent) {
  //   if (query) {
  //     const element = query.target as HTMLInputElement;
  //     this.shopService.searchProduct(element.value).subscribe((result) => {
  //       console.warn(result);
  //       if(result.length < 5){
  //         result.length = 5
  //       }
  //       this.searchResult = result;
  //     });
  //   }
  // }

  searchProduct(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const query = input.value.trim();

    // If search box empty → close results
    if (!query) {
      this.searchResult = [];
      return;
    }

    // Fetch search results
    this.shopService.searchProduct(query).subscribe((res: any) => {
      const products = res?.products || [];

      // Take maximum 5 items
      this.searchResult = products.slice(0, 5);
    });
  }


  gotoCartPage() {
    this.route.navigate(['/cart-page']);
  }
  showSearchInput = false; //initially hidden
  toggleSearch() {
    this.showSearchInput = !this.showSearchInput; //toggle visibility
  }
  hideSearch() {
    this.searchResult = undefined; 
  }

  // ye wala mene likha tha but jab bhi jab kisi product mai hote tab ye link same kaam nhi karti hai tho mereko force fully chnage krna pda issko
  // redirectToDetail(id: number) {
  //   this.route.navigate(['/detail/' + id])
  // }
  redirectToDetail(id: number) {
  this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.route.navigate(['/detail', id]);
  });
}
}



