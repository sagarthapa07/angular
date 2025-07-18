import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-resource',
  imports: [RouterLink,HeaderComponent],
  templateUrl: './resource.component.html',
  styleUrl: './resource.component.css',
})
export class ResourceComponent {
  items = [
    {
      prodID: 1,
      img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2F9d449761da7e68b17b5fbd5aac5647d40b96903d-500x500.png&w=750&q=75',
      type: 'gadget accessories, Airbuds',
      name: 'Apple AirPods 3rd generation with Charging Case',
      stock: 5,
      price: 1700.0,
    },
    {
      prodID: 2,
      img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2Fc6e0da93e884e6ab9fc7b2a884c6d28ad7f2020e-500x500.png&w=750&q=75',
      type: 'gadget accessories, Cameras',
      name: 'Canon EOS 250D 24.1MP Full HD WI-FI DSLR Camera with 18-55mm',
      stock: 20,
      price: 750.0,
    },
    {
      prodID: 3,
      img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2F480dae813a99d8331778f7a3edbc6cb98512208c-500x500.png&w=750&q=75',
      type: 'gadget accessories, Laptop',
      name: 'hp-laptop-amd-ryzen-5-5500u-processor',
      stock: 17,
      price: 1659.0,
    },
    {
      prodID: 4,
      img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2F38766ca9c29fa255abcfcaa9fd830b60054daf9d-500x500.png&w=750&q=75',
      type: 'gadget accessories',
      name: 'mpow-che2s-on-ear-headphone-with-mic-for-kids',
      stock: 5,
      price: 550.0,
    },
    {
      prodID: 5,
      img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2F6a182188c90b312b1b3951c1d5b9626ef854b10e-500x500.png&w=750&q=75',
      type: 'gadget accessories, smartphone',
      name: 'realme-note-60x-4-64gb',
      stock: 15,
      price: 105.0,
    },
    {
      prodID: 6,
      img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2Fa4d5751b9772189b6536fd7720a885cb27be8c6b-500x500.png&w=750&q=75',
      type: 'gadget accessories, SmartPhone',
      name: 'samsung-galaxy-s25-ultra-5g-12-256gb',
      stock: 57,
      price: 99.0,
    },
    {
      prodID: 7,
      img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2Fc2c857cae8cefda07a357637f3c90b239cd1ae73-500x500.png&w=750&q=75',
      type: 'gadget accessories, Laptop',
      name: 'sony-wh-ch520-wireless-headphones',
      stock: 12,
      price: 499.0,
    },
    {
      prodID: 8,
      img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2Faa9f2fafc6e277a101e3b17bd4fa00b7d99c6b4b-300x300.png&w=750&q=75',
      type: 'gadget accessories',
      name: 'speak-710-portable-speaker-for-music-and-calls',
      stock: 51,
      price: 150.0,
    },
    {
      prodID: 9,
      img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2Fbdd6d2597360e46e94a86f7f31018a05d91ac68d-300x300.png&w=750&q=75',
      type: 'gadget accessories',
      name: 'wireless-bluetooth-speaker-for-softphones',
      stock: 10,
      price: 220.0,
    },
    {
      prodID: 10,
      img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2F2a75ca8224d0256ac7048b421b82abb95fca0384-500x500.png&w=750&q=75',
      type: 'gadget accessories, Smartphones',
      name: 'iphone-16-pro-max-128gb',
      stock: 13,
      price: 1299.0,
    },
    {
      prodID: 11,
      img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2F5d45077fc88810e070d674b28d43813329843942-500x500.png&w=750&q=75',
      type: 'gadget accessories, Smartphones',
      name: 'Apple Mac Mini M4 Chip 16/512GB Silver (10C CPU 10C GPU)',
      stock: 23,
      price: 600.0,
    },
    {
      prodID: 12,
      img: 'https://shopcart.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foe6m9gg8%2Fproduction%2F18ffedbb1b22ca763c0aebc79dac0955751b4585-500x500.png&w=750&q=75',
      type: 'gadget accessories, Smartphones',
      name: 'Laundry Wash Machine Washer/Spinner Pump',
      stock: 6,
      price: 1199.0,
    },
  ];

}
