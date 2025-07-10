import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HttpClientModule } from '@angular/common/http';
import { beforeLoginGuard } from './core/gaurd/before-login.guard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HttpClientModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'hello-world';
}
//styleUrl: './app.component.css'



// import { ResourceComponent } from "./components/resource/resource.component";
// import { SignUpComponent } from "./components/sign-up/sign-up.component";
// import { GrantComponent } from "./components/grant/grant.component";
// import { LoginComponent } from "./components/login/login.component";
// import { DetailComponent } from './components/detail/detail.component';



//  ResourceComponent, SignUpComponent, GrantComponent, LoginComponent, DetailComponent,