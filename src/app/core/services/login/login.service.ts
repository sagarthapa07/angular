import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
  
})
export class LoginService {
  loginUrl: string = 'https://dummyjson.com/user/login';     // API store kiya LoginUrl mai 
  // private http = inject(HttpClient);

  constructor (private http: HttpClient){}  
  // constructor hamra angular component / service hai jo use hot hai Dependency Injection k liye ,jaise humne yha pat HttpClient ko inject kiya 
  // HttpClint ek service hai jo humme Httprequest karne power deta hai  
  loginUser(data:any)
  {
    // data:{username:string, password:string}
    return this.http.post(this.loginUrl,data);      
    //post request send kr rhe hai Http.client service ko use kar k API mai jo this.loginUrl mai store hai ,or uss k data mai bhi 
  }
}