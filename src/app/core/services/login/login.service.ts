import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CommonService } from '../common/common.service';
import { Router } from '@angular/router';
import { Signup } from '../../../dataType';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

//Ye service ko declare kiya gaya aur Angular DI (dependency injection) ke root me provide kar diya, taaki app ke kisi bhi jagah use ho sake.

export class LoginService {
  loginUrl: string = 'https://dummyjson.com/user/login';      // Login API endpoint URL ko variable loginUrl me store kiya.

  private isUserLogin = signal(false);
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  userLogin: any

  constructor(private http: HttpClient, public common: CommonService, private router: Router) { }

  loginUser(data: any) {
    return this.http.post(this.loginUrl, data);
  }

  //loginUser: method jo login API ko POST request bhejta hai user credentials (data) ke saath. API call ka observable return karta hai.



  setAuth(valstring: any) {
 
    this.isUserLogin.set(true);
    this.common.setCookie('sagar', valstring, 1);
  }

  //Jab user login ya signup successful ho, to ye function: isUserLogin signal ko true set karta hai (user logged in state)  ,User data ko cookie me "sagar" naam se 1 din ke liye store karta hai (via common service).


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

// isLogin method cookie check karta hai:
// Agar "sagar" cookie hai to signal ko true kar deta hai.
// Nahi to false.
// isUserLogin signal return karta hai, taaki component me subscribe ya react kar sake.




  isLoginUser(): boolean {
    this.userLogin = this.common.getCookie('sagar');
    if (this.userLogin) {
      return true;
    } else {
      return false;
    }
  }
// isLoginUser: sync method jo sirf boolean return karta hai ki user login hai ya nahi.
// Cookie "sagar" ka existence check karta hai.


  logOutUser() {
    this.common.deleteCookie('sagar');
    this.isUserLogin.set(false);
    this.router.navigate(['/']);
  }
// logOutUser: logout ke liye:
// "sagar" cookie delete karta hai.
// isUserLogin signal ko false kar deta hai.




  getUserData() {
    let userData = JSON.parse(this.common.getCookie('sagar'));
    return userData ? userData : null;
  }
// getUserData: cookie me stored user data ko parse karke return karta hai.
// Agar cookie nahi mile to null return karta hai.



  userSignup(data: Signup) {
    return this.http.post('https://dummyjson.com/users/add', data, { observe: 'response' }).pipe(
      tap((res: any) => {
        this.setAuth(res.body);
        this.router.navigate(['/']);
        console.log("User account registered and logged in");
      }),
      catchError((error) => {
        console.error("Signup failed:", error.message || error)
        return throwError(() => error);
      })
    );
  }

// Signup API (dummyjson.com/users/add) ko POST request bhejta hai data ke saath.
// { observe: 'response' }: pura HTTP response leta hai (status, headers, body).
// tap: successful response pe user data ko cookie me save karta hai (setAuth), aur homepage pe redirect karta hai.
// catchError: agar signup fail ho to error console pe show karta hai aur observable me error throw karta hai.



}
