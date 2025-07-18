import { Component } from '@angular/core';
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
  
  constructor(private login:LoginService,
  private router: Router
  ){}
  isLoggedIn: boolean = false;


  ngOnInit(){
    this.isLoggedIn = this.login.isLogin();
    if(this.isLoggedIn){
      this.router.navigate(['/resource']);
    }
  }
  
  logout() {
    this.login.common.deleteCookie('sagar');
    this.isLoggedIn = false; 
    this.router.navigate(['/home']);
    
} 
}


