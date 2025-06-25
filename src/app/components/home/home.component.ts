import { Component } from '@angular/core';
import { HomeServicesService } from '../../home-services.service';

@Component({
  selector: "app-home",
  imports: [],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})

export class HomeComponent {
  total: number = 0;

  arr = [
    {
      name: "apple",
      val: "this is an apple ", 
      img: "https://cdn.pixabay.com/photo/2018/07/25/06/09/apples-3560751_1280.jpg",
    },
    {
      name: "mango",
      val: "this is an mango",
      img: "https://cdn.pixabay.com/photo/2017/05/31/14/31/mango-2360551_1280.jpg",
    },
    {
      name: "banana",
      val: "this is an banana",
      img: "https://cdn.pixabay.com/photo/2015/08/14/19/41/minion-888797_1280.jpg",
    },
    {
      name: "orange",
      val: "this is an orange",
      img: "https://cdn.pixabay.com/photo/2017/01/20/15/06/oranges-1995056_1280.jpg",
    },
    {
      name: "GRapes",
      val: "this is an GRapes",
      img: "https://cdn.pixabay.com/photo/2016/10/17/09/25/vines-1747224_1280.jpg",
    },
  ];

  cars = [
    {
      Name: "Lamborghini Huracán",
      Type: "Sports",
      img: "https://cdn.pixabay.com/photo/2017/08/27/09/50/auto-2685492_1280.jpg",
      about:
        "A high-performance supercar known for its aggressive styling and a roaring V10 engine. Speed meets luxury in this Italian beast.",
    },
    {
      Name: "Ferrari 488 Spider",
      Type: "Sports",
      img: "https://cdn.pixabay.com/photo/2018/04/11/09/15/auto-3309967_1280.jpg",
      about:
        "An elegant convertible supercar combining track-level performance with the thrill of open-top driving. Classic Ferrari power and precision.",
    },
    {
      Name: "Nissan Skyline",
      Type: "old Money",
      img: "https://cdn.pixabay.com/photo/2018/07/18/17/27/nissan-3546822_1280.jpg",
      about:
        "A Japanese legend famous for its GT-R models. Loved by tuners and racers, it's iconic for speed and street racing heritage.",
    },
    {
      Name: "ToyotaToyota Supra MK4",
      Type: "Sports",
      img: "https://cdn.pixabay.com/photo/2015/10/01/13/36/car-967011_1280.jpg",
      about:
        "A legendary sports car with powerful turbocharged engines and sleek design. A favorite in the JDM world and motorsports.",
    },
    {
      Name: "Hyundai SUV (Tucson)",
      Type: "SUV",
      img: "https://cdn.pixabay.com/photo/2023/03/09/18/20/vehicle-7840524_1280.jpg",
      about:
        "Modern, family-friendly SUV with a comfortable ride, smart features, and efficient performance. Hyundai blends style and practicality.",
    },
    {
      Name: "Tata Old Cars",
      Type: "Old",
      img: "https://cdn.pixabay.com/photo/2016/05/18/10/52/buick-1400243_1280.jpg",
      about:
        "Iconic Indian vehicles known for their rugged build and utility. A nostalgic reminder of early Indian road adventures.",
    },
    {
      Name: "Tata Old Cars",
      Type: "Old",
      img: "https://cdn.pixabay.com/photo/2016/05/18/10/52/buick-1400243_1280.jpg",
      about:
        "Iconic Indian vehicles known for their rugged build and utility. A nostalgic reminder of early Indian road adventures.",
    },
    {
      Name: "Tata Old Cars",
      Type: "Old",
      img: "https://cdn.pixabay.com/photo/2016/05/18/10/52/buick-1400243_1280.jpg",
      about:
        "Iconic Indian vehicles known for their rugged build and utility. A nostalgic reminder of early Indian road adventures.",
    },
  ];

 card3 = [{
    title:"Stater",
    info:"This Packege offers the basics Features you need to get started.",
    Price: "$39/Month",
    Features:"Features",
    Text1:"lorem ipsum dolor sit amet elit.",
    Text2:"Sed do eiusmod dolore magna aliqua.",
    Text3:"Ut enim ad minim veniam.",
    Text4:"Ut enim ad minim veniam",},
  {
    title:"Enterprise",
    info:"This Packege full access to all Premium Features.",
    Price: "$99/Month",
    Features:"Features",
    Text1:"lorem ipsum dolor sit amet elit.",
    Text2:"Sed do eiusmod dolore magna aliqua.",
    Text3:"Ut enim ad minim veniam.",
    Text4:"Ut enim ad minim veniam",},
 ]


  constructor(private home: HomeServicesService) {}

  
  add(a: number, b: number) {
    this.total = this.home.add(a, b);
  }
  subtract(a: number, b: number) {
    this.total = this.home.subtract(a, b);
  }
}
