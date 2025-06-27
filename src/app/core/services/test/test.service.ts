import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor() { }

calcution(a:number,b:number){
  return a+b;
}
}
