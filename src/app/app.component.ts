import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ResourceComponent } from "./components/resource/resource.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { GrantComponent } from "./components/grant/grant.component";
import { LoginComponent } from "./components/login/login.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ResourceComponent, SignUpComponent, GrantComponent, LoginComponent],
  templateUrl: './app.component.html',
  //styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hello-world';
}
