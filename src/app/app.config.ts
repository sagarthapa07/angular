import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';


import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { loginGuard } from './core/gaurd/login.guard';
import { beforeLoginGuard } from './core/gaurd/before-login.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    CookieService,

  ]
};
