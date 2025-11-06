import { AfterViewInit, Component, effect, OnInit } from '@angular/core';
import { Router, RouterLink,  } from '@angular/router';
import { LoginService } from '../../core/services/login/login.service';
import { CommonModule } from '@angular/common';
import { ShopService } from '../../core/services/shop/shop.service';
import { CommonService } from '../../core/services/common/common.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isLoggedIn:boolean = false;
  cartItems = 0;
  menuType: string = 'default'
  constructor(private login:LoginService,
  private router: Router,
  private shopService:ShopService,
  private common:CommonService,
  private route:Router,

  ){
    effect(() => {
       this.isLoggedIn = this.login.isLogin()();   
    });
  }
  ngOnInit(){

   
  }

  ngAfterViewInit(): void {
     if(this.isLoggedIn){
       let user = this.common.getCookie('sagar');
            
          if (user) {
            let userId = JSON.parse(user).id
            this.shopService.getCartList(userId);
            this.shopService.cartData.subscribe((result) => {
             this.cartItems = result.length;
            })
          }

    }
    else {

    let cartData = localStorage.getItem('localCart');

    if(cartData){
      this.cartItems= JSON.parse(cartData).length;

    }
  }
  }
  
  logout() {
    this.cartItems = 0;
    this.shopService.cartData.emit([]);   
    this.login.logOutUser()
    this.router.navigate(['/home']);
} 
}


