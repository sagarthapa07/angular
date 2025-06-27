import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { last } from 'rxjs';
import { LoginService } from '../../core/services/login/login.service';
import { CommonService } from '../../core/common/common.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  message: string = '';
  loginForm!: FormGroup;

  constructor(private login: LoginService,private common: CommonService){ }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("",Validators.required),
      password: new FormControl("", Validators.required),
    });
  }
  


  //
  onSubmit() {

    this.login.loginUser({username : this.loginForm.value.email,password : this.loginForm.value.password}).subscribe((resp:any)=> {
      // let valstring = JSON.stringify(resp);
      // let anotherOBJ = JSON.parse(valstring);
      // console.log();

      const checkUserName = this.loginForm.value.username;
      const checkUserPass = this.loginForm.value.password;

      let usercheck = false
      for(let user of valstring){
        if(this.valstring.value. ===  checkUserName && valstring.password ===  checkUserPass )
      }

      




      this.common.setCookie('sagar', valstring , 1);

    });
  }
}

onLogin(){




}



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
