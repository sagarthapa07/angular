import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ResourceComponent } from './components/resource/resource.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { GrantComponent } from './components/Shop/grant.component';
import { LoginComponent } from './components/login/login.component';
import { DetailComponent } from './components/detail/detail.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { UserComponent } from './components/user/user.component';
import { loginGuard } from './core/gaurd/login.guard';
import { beforeLoginGuard } from './core/gaurd/before-login.guard';


export const routes: Routes = [


{path:"blogs", component: AboutUsComponent},

{path:"products", component:ResourceComponent,},
{path:"shop", component:GrantComponent,},
{path:"detail", component:DetailComponent,},
{path:"cart-page", component:CartPageComponent, canActivate:[loginGuard]},
{path:"user", component:UserComponent, canActivate:[loginGuard]},

{path:"sign-up", component:SignUpComponent, },
{path:"Login", component:LoginComponent, },



{path:"", component: HomeComponent},
];
