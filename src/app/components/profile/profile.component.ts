import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  imports: [NgFor, NgIf, NgbDropdownModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  statusOptions = ['All', 'Ordered', 'Shipped', 'Delivered', 'Cancelled'];
  timeOptions = ['Newest First', 'Oldest First'];

  selectedStatus = 'All';
  selectedTime = 'Newest First';
  
  editName = false;
  firstName = "Sagar";
  lastName = "Thapa";
    // Password Fields
  editPass = false;
  newPassword = "";
  confirmPassword = "";

    // Contact Fields
  editContact = false;
  email = "sagar@gmail.com";
  phone = "9876543210";





  select(optionType: string, value: string) {
    if (optionType === 'status') this.selectedStatus = value;
    if (optionType === 'time') this.selectedTime = value;
  }

  menuItems = [
    { name: 'Dashboard', icon: 'bi bi-columns-gap', route: 'main' },
    { name: 'Orders', icon: 'bi bi-box-seam', route: 'orders' },
    { name: 'Wishlist', icon: 'bi bi-heart', route: 'wishlist' },
    { name: 'Addresses', icon: 'bi bi-geo-alt', route: 'addresses' },
    {
      name: 'Personal Info',
      icon: 'bi bi-person-fill',
      route: 'personal-info',
    },
  ];
  activeItem = 'Dashboard';


  toggleNameEdit() {
    this.editName = !this.editName;
  }
    toggleContactEdit() {
    this.editContact = !this.editContact;
  }
    togglePasswordEdit() {
    this.editPass = !this.editPass;
  }

}
