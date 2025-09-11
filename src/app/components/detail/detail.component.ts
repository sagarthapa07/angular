import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ShopService } from '../../core/services/shop/shop.service';
import { Product } from '../../dataType';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-detail',
  imports: [RouterLink,CommonModule,NgbCollapseModule,NgbNavModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  active = 1;
  isCollapsed = true;
  productId: string | null = null;
  product: Product | null = null;



  constructor(private shopService: ShopService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get("id");

    if (this.productId) {
      this.shopService.getProduct(this.productId).subscribe({
        next: (data) => {
          this.product = data;
          console.warn('Product:', this.product);
        },
        error: (err) => {
          console.warn('Error fetching product:', err);
        }
      });
    }
  }

    getDiscountedPrice(price: number, discount: number): number {
    const discounted = price - (price * discount) / 100;   //Formula of discount
    return parseFloat(discounted.toFixed(2));     // parseFloat => turns that string back into a number: 477.82
  }

  
}