import { Component } from '@angular/core';
import { HomeServicesService } from '../../core/services/home/home-services.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Categories, Items, Product } from '../../dataType';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';


@Component({
  selector: "app-home",
  imports: [NgbNavModule, RouterLink, NgForOf],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})

export class HomeComponent {
  total: number = 0;
  active = 1;


  productList: undefined | Items[]
  beatyItem: undefined | Items[]
  furnitureItem: Items[] | undefined;
  othersItem: Items[] | undefined;
  allCategories: Categories[] = [];

  constructor(private homeService: HomeServicesService, private home: HomeServicesService) { }



  ngOnInit(): void {
    this.loadCategoryData(this.active);
    this.fetchAllCategories(); 
  }
  onTabChange(tabId: number): void {
    this.active = tabId;
    this.loadCategoryData(tabId);
  }
  loadCategoryData(tabId: number): void {
    switch (tabId) {
      case 1:
        this.homeService.smartPhonesItems().subscribe((data) => {
          console.warn('Smartphone Products loaded', data);
          this.productList = data.products.slice(0, 10);
        });
        break;
      case 2:
        this.homeService.beautyItem().subscribe((data) => {
          console.warn('Beauty Products loaded', data);
          this.beatyItem = data.products;
        });
        break;

      case 3:
        this.homeService.furnitureItem().subscribe((data) => {
          console.warn('Furniture Products loaded', data);
          this.furnitureItem = data.products;
        });
        break;

      case 4:
        this.homeService.groceriesItem().subscribe((data) => {
          console.warn('Groceries Products loaded', data);
          this.othersItem = data.products.slice(0,10);
        });
        break;
    }
  }

  fetchAllCategories(): void {
    this.homeService.getCategories().subscribe((categories) => {
      this.allCategories = categories.slice(0, 6);
    });
  }

  getDiscountedPrice(price: number, discount: number): number {
    const discounted = price - (price * discount) / 100;   //Formula of discount
    return parseFloat(discounted.toFixed(2));     // parseFloat => turns that string back into a number: 477.82




  }

}
