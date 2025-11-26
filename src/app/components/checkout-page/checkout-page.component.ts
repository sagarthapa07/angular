import { NgIf, NgForOf } from "@angular/common";
import { ShopService } from "../../core/services/shop/shop.service";
import { FormsModule, NgForm } from "@angular/forms";
import { Component } from "@angular/core";
import { address } from "../../dataType";

@Component({
  selector: 'app-checkout-page',
  imports: [NgIf, FormsModule, NgForOf],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent {

  showAddressPopup = false;
  showPopup = false;
  alertMessage = '';

  addressType: string = 'home';
  addressList: address[] | undefined;

  constructor(private shopservice: ShopService) { }

  ngOnInit(): void {
    this.shopservice.addressList().subscribe({
      next: (res) => {
        this.addressList = res;
      },
      error: (err) => {
        this.showA("Failed to load address list.");
        console.error(err);
      }
    });
  }

  openLoginForm() {
    this.showAddressPopup = true;
  }

  closeAddressForm() {
    this.showAddressPopup = false;
  }

  showA(message: string) {
    this.alertMessage = message;
    this.showPopup = true;

    setTimeout(() => {
      this.showPopup = false;
    }, 2000);
  }

  submit(form: NgForm) {
    // Basic Validation
    if (!form.valid || !this.addressType) {
      this.showA("Please fill all required fields.");
      return;
    }
    const formData = {
      ...form.value,
      addressType: this.addressType
    };
    this.shopservice.addAddress(formData).subscribe({
      next: () => {
        this.showA("Address Saved Successfully!");
        this.closeAddressForm();
        form.resetForm();
        this.addressType = 'home';
      },
      error: () => {
        this.showA("Failed to save address!");
      }
    });
  }
}
