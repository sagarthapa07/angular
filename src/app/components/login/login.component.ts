import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../core/services/login/login.service';
import { CommonService } from '../../core/services/common/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { SignupService } from '../../core/services/signup/signup.service';
import { Signup } from '../../dataType';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  showLogin = true;
  message: string = '';
  loginForm!: FormGroup;

  constructor(private login: LoginService,
    private common: CommonService,
    private router: Router,
    private loginService: LoginService,
    private signUpService: SignupService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const mode = params['mode'];
      if (mode === 'signup') {
        this.showLogin = false;
      } else {
        this.showLogin = true;
      }
    });

    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      name: new FormControl('', this.showLogin ? [] : [Validators.required]),
      lastName: new FormControl('', this.showLogin ? [] : [Validators.required]),
      age: new FormControl('', this.showLogin ? [] : [Validators.required])
    });
  }

  openLogin() {
    this.showLogin = false;
    console.log("Switching to Sign Up:", this.showLogin);
  }

  openSignUP() {
    this.showLogin = true;
    console.log("Switching to Login:", this.showLogin);
  }

  signup() {
    if (this.showLogin || this.loginForm.invalid) {
      this.message = 'Please fill all required fields';
      return;
    }

    const signupData = {
      firstName: this.loginForm.value.name,
      lastName: this.loginForm.value.lastName,
      age: +this.loginForm.value.age,
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.login.userSignup(signupData).subscribe({
      next: (res) => {
        console.log('User signed up successfully', res);
        this.message = 'Signup successful! Redirecting...';
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Signup failed', err);
        this.message = 'Signup failed. Please try again.';
      }
    });
  }


  onSubmit() {
    this.message = '';  // Reset previous error message

    this.login.loginUser({
      username: this.loginForm.value.email,
      password: this.loginForm.value.password
    }).subscribe({
      next: (resp: any) => {
        let valstring = JSON.stringify(resp);
        this.login.setAuth(valstring);
        this.router.navigate(['/products']);
      },
      error: (error) => {
        if (error.status === 401) {
          this.message = 'Wrong Password';
        } else if (error.status === 404) {
          this.message = 'User not found';
        } else {
          this.message = 'Something went wrong. Please try again.';
        }
      }
    });
  }

}





// signup() {
//   debugger
//   this.message = '';

//   if (this.loginForm.invalid) {
//     this.message = 'Please fill all required fields.';
//     return;
//   }

//   const signupData: Signup = {
//     name: this.loginForm.value.firstName,
//     lastname: this.loginForm.value.lastName,
//     email: this.loginForm.value.email,
//     password: this.loginForm.value.password,
//     age: this.loginForm.value.age
//   };

//   this.login.userSignup(signupData); // this will call service method
// }










// onLogin(){
// let anotherOBJ = JSON.parse(valstring);
// console.log();

// const checkUserName = this.loginForm.value.username;
// const checkUserPass = this.loginForm.value.password;

// let usercheck = false
// for(let user of valstring){
//   if(this.valstring.value. ===  checkUserName && valstring.password ===  checkUserPass )
// }
// }



// if(this.loginForm.valid){
//   this. = this.homeService.validatelogin
// }
// console.log(this.loginForm.value);
// let emailid = this.loginarr[0].email;
// let passwod = this.loginarr[0].password;

//   for (let i=0 ; i<= 5; i++){
//   }
//     if(this.loginForm.value.email == emailid && this.loginForm.value.password == passwod ){
//       //redirect at home
//       this.message="Success"
//     }
//     else{
//       this.message= "Error Inalid Userid or Pass"
//     }
//   }

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
