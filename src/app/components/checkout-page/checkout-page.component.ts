import { Component } from '@angular/core';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-checkout-page',
  imports: [NgIf],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent {
showAddressPopup = false;

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
