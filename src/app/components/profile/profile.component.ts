import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

// import { NgbModule, NgbNavItem, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  imports: [NgFor],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
menuItems = [  
  { name: 'Dashboard', icon: 'bi bi-columns-gap', route: 'main' },
  { name: 'Orders', icon: 'bi bi-box-seam', route: 'orders' },
  { name: 'Wishlist', icon: 'bi bi-heart', route: 'wishlist' },
  { name: 'Addresses', icon: 'bi bi-geo-alt', route: 'addresses' },
  { name: 'Personal Info', icon: 'bi bi-person-fill', route: 'personal-info' },
  ];
activeItem = 'Dashboard'; 







}
