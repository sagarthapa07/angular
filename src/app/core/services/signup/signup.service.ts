import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  signUrl = 'https://dummyjson.com/users/add'; //store api url

  constructor(private http: HttpClient) {}

signupUser(data:any) {
    return this.http.post(this.signUrl, data);
  }
}
