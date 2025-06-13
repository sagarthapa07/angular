import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeServicesService {
  loginarr: any = [
    {
      id: 1,
      name: 'sagar1',
      last: 'thapa1',
      email: 'sagar1123@gmail.com',
      password: 'qwerty',
      phone: '8171954889',
    },
    {
      id: 2,
      name: 'sagar2',
      last: 'thapa2',
      email: 'sagar2123@gmail.com',
      password: 'qwerty2',
      phone: '8171954889',
    },
    {
      id: 3,
      name: 'sagar3',
      last: 'thapa3',
      email: 'sagar3123@gmail.com',
      password: 'qwerty3',
      phone: '8171954889',
    },
    {
      id: 4,
      name: 'sagar4',
      last: 'thapa4',
      email: 'sagar4123@gmail.com',
      password: 'qwerty4',
      phone: '8171954889',
    },
    {
      id: 5,
      name: 'sagar5',
      last: 'thapa5',
      email: 'sagar5123@gmail.com',
      password: 'qwerty5',
      phone: '8171954889',
    },
    {
      id: 6,
      name: 'sagar6',
      last: 'thapa6',
      email: 'sagar6123@gmail.com',
      password: 'qwerty6',
      phone: '8171954889',
    },
    {
      id: 7,
      name: 'sagar7',
      last: 'thapa7',
      email: 'sagar7123@gmail.com',
      password: 'qwerty6',
      phone: '8171954889',
    },
    {
      id: 8,
      name: 'sagar8',
      last: 'thapa8',
      email: 'sagar8123@gmail.com',
      password: 'qwerty6',
      phone: '8171954889',
    },
    {
      id: 9,
      name: 'sagar9',
      last: 'thapa9',
      email: 'sagar9123@gmail.com',
      password: 'qwerty9',
      phone: '8171954889',
    },
    {
      id: 10,
      name: 'sagar10',
      last: 'thapa10',
      email: 'sagar10123@gmail.com',
      password: 'qwerty10',
      phone: '8171954889',
    },
  ];

  
  isCheckUserExist(email: string) {
    return this.loginarr.some((user: any) => user.email == email);
  }

  validatelogin(email: string, password: string){
    return this.loginarr.filter((user:any) => user.email == email && user.password == password);
  }



  add(a: number, b: number): number {
    return a + b;
  }
  subtract(a: number, b: number): number {
    return a - b;
  }
  multiply(a: number, b: number): number {
    return a * b;
  }
  divide(a: number, b: number): number {
    return b !== 0 ? a / b : 0;
  }
}
