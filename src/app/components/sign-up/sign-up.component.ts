import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HomeServicesService } from '../../core/services/home/home-services.service';
// import { SignupService } from '../../core/services/signup/signup.service';
import { CommonService } from '../../core/services/common/common.service';
import { SignupService } from '../../core/services/signup/signup.service';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  message: string = '';
  signupForm!: FormGroup;

  isUserExist: boolean = false;

  constructor(private signup: SignupService, private common: CommonService, private route: Router) {}



  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    const signUpData = this.signupForm.value;

    console.log('Signup Data:', signUpData);

    this.signup.signupUser(signUpData).subscribe((res: any) => {
      const signupString = JSON.stringify(signUpData);
      console.log(typeof signupString);


      this.common.setCookie(
        'sagar',
        signupString,1
      );
     this.route.navigate(['products']);
     

    });
  }

}

// if (this.signupForm.valid) {
//   this.isUserExist = this.homeService.isCheckUserExist(
//     this.signupForm.value.email
//   );

//   if(!this.isUserExist) return

// } else {
// }
