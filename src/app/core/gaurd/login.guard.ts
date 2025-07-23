import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';


// Angular 16 se pehele ye classs hota tha pehele constructor banana padta tha 
export const loginGuard: CanActivateFn = (route, state) => {
 const loginService = inject(LoginService);
  const router = inject(Router);
  

  if (loginService.isLogin()()) {
  }
  else{
    router.navigate(['/home']);
  }
  return true;
};