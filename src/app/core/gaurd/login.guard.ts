import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


// Angular 16 se pehele ye classs hota tha pehele constructor banana padta tha 
export const loginGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)

  let isLoggedIn 


  return true;
};
