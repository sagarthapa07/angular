import { Component } from '@angular/core';

import {
  FormControl,
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
  
} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm : FormGroup
  ngOnInit(){
    let email = new FormControl()
    let password= new FormControl()
    this.loginForm = new FormControl({
      email: email,
      password: password,
    });
  }
}
// email = 'sagar@gmail.com';
// password = '1234';

// ngOnInit() {
//   console.log('Hi Sagar');
//   console.log('Email:', this.email);
//   console.log('Password:', this.password);
// }

// onSubmit() {
//   console.log('Hi Vikalp');
//   this.email = 'vikalp';
//   this.password = 'qwerty';
//   console.log('Email:', this.email);
//   console.log('Password', this.password);
// }

// form = new FormGroup({
//   username: new FormControl('', Validators.required),
// });
