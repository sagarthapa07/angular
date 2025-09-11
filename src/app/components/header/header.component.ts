import { Component, effect } from '@angular/core';
import { Router, RouterLink,  } from '@angular/router';
import { LoginService } from '../../core/services/login/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isLoggedIn:boolean = false;
  constructor(private login:LoginService,
  private router: Router
  ){
    effect(() => {
       this.isLoggedIn = this.login.isLogin()();   
    });
  }
  ngOnInit(){
  }
  
  logout() {
    this.login.logOutUser()
    this.router.navigate(['/home']);
} 
}


