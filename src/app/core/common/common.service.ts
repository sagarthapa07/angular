import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private cookieService:CookieService) { }

  public setCookie(key: string, value: string, expireTime: any) {
    this.cookieService.set(key, JSON.stringify(value), {
      expires: expireTime,
      path: '/',
      domain: environment.domain,
      sameSite: 'Lax',
    });
    return true;
  }
  getCookie(name: string) {
    return this.cookieService.get(name);
  }
}
