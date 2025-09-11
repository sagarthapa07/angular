import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signup } from '../../../dataType';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

signupUser(data:Signup) {
    console.warn(data);
    this.http.post('https://dummyjson.com/users/add',data,{ observe: 'response' }).subscribe((result)=>{
      this.isSellerLoggedIn.next(true);
    })
  }
}
