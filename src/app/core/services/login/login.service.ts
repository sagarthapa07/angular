import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CommonService } from '../common/common.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginUrl: string = 'https://dummyjson.com/user/login'; // API store kiya LoginUrl mai

  // private http = inject(HttpClient);

  private isUserLogin = signal(false);

  constructor(private http: HttpClient, public common: CommonService) {}
  // constructor hamra angular component / service hai jo use hot hai Dependency Injection k liye ,jaise humne yha pat HttpClient ko inject kiya
  // HttpClint ek service hai jo humme Httprequest karne power deta hai
  loginUser(data: any) {
    // data:{username:string, password:string}
    return this.http.post(this.loginUrl, data);
    //post request send kr rhe hai Http.client service ko use kar k API mai jo this.loginUrl mai store hai ,or uss k data mai bhi
  }

  setAuth(valstring: any) {
   
        this.isUserLogin.set(true);

    this.common.setCookie('sagar', valstring, 1);

  }
  
  isLogin() {
    let userLogin = this.common.getCookie('sagar');
    if (userLogin) {
          this.isUserLogin.set(true);
      return this.isUserLogin;
    } else {
          this.isUserLogin.set(false);
      return this.isUserLogin;
    }
  }

 




  // isLogin() WritableSignal<boolean>  {
  //   let userLogin = this.common.getCookie('sagar');
  //   if (userLogin) {
  //         this.isUserLogin.set(true);
  //     return this.isUserLogin;
  //   } else {
  //         this.isUserLogin.set(false);
  //     return this.isUserLogin;
  //   }
  // }

  //  isLogin(): WritableSignal<boolean> {
  //   return this.isUserLogin;
  // }

  isLoginUser(): boolean {
    let userLogin = this.common.getCookie('sagar');
    if (userLogin) {
      return true;
    } else {
      return false;
    }
  }

  logOutUser() {
    this.common.deleteCookie('sagar');
    this.isUserLogin.set(false);
  }
}
