import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = 'sagar@gmail.com';
  password = '1234';

  ngOnInit() {
    console.log('Hi Sagar');
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }

  onSubmit() {
    console.log('Hi Vikalp');
    this.email = "vikalp"
    this.password = "qwerty"
    console.log('Email:', this.email);
    console.log('Password', this.password);
  }
}
