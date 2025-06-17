import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ResourceComponent } from './components/resource/resource.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { GrantComponent } from './components/grant/grant.component';
import { LoginComponent } from './components/login/login.component';
import { DetailComponent } from './components/detail/detail.component';


export const routes: Routes = [

{path:"home", component: HomeComponent},
{path:"about-us", component: AboutUsComponent},
{path:"resource", component:ResourceComponent},
{path:"sign-up", component:SignUpComponent},
{path:"grant", component:GrantComponent},
{path:"Login", component:LoginComponent},
{path:"detail", component:DetailComponent},
];
