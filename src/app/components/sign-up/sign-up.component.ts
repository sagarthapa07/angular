import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HomeServicesService } from '../../home-services.service';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  message: string = '';
  signupForm!: FormGroup;

  isUserExist:boolean = false;

  constructor(private homeService: HomeServicesService) {}

  
  ngOnInit() {

    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      number: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });


  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isUserExist = this.homeService.isCheckUserExist(
        this.signupForm.value.email
      );

      if(!this.isUserExist) return

    
    } else {
    }
  }
}
