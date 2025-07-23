import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

export const beforeLoginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);

  const router = inject(Router);


  return true;
};
// if (loginService.isLogin()) {
//   router.navigate(['/products']);
// }


// @Injectable({
//   providedIn: 'root',
// })
// export class BeforeloginGuard implements CanActivate {
//   constructor(
//     private loginService: LoginService,
//     private router: Router,
//     @Inject(DOCUMENT) private document: Document
//   ) { }
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     if (!this.loginService.isLoggedIn()) {
//       return true;
//     }
//     this.router.navigate(['/main/dashboard']);
//     return true;
//   }
// }
