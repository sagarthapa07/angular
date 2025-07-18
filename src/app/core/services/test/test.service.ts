import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private router:Router) { }

calcution(a:number,b:number){
  return a+b;
}

check(){
  
}
}
