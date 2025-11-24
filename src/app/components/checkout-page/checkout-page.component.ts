import { Component } from '@angular/core';
import { NgIf } from "@angular/common";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout-page',
  imports: [NgIf,FormsModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent {
showAddressPopup = false;
addressType = 'home';

openLoginForm() {
  this.showAddressPopup = true;
}

closeAddressForm() {
  this.showAddressPopup = false;
}

saveAddress() {
  alert("Address Saved Successfully!");
  this.closeAddressForm();
}

}
