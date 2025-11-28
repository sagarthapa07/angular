import { NgIf, NgForOf } from "@angular/common";
import { ShopService } from "../../core/services/shop/shop.service";
import { FormsModule, NgForm } from "@angular/forms";
import { Component } from "@angular/core";
import { address } from "../../dataType";
import { CommonService } from "../../core/services/common/common.service";

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
  isEditMode = false;
  editAddressData: any = null;
  cartData: any[] | undefined
  addressType: string = 'home';
  addressList: address[] | undefined;

  constructor(private shopservice: ShopService, private common: CommonService) { }

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
  closeAddressForm() {
    this.showAddressPopup = false;
  }
  openAddForm() {
    this.isEditMode = false;
    this.editAddressData = null;
    this.showAddressPopup = true;
  }
  openEditForm(item: address) {
    this.isEditMode = true;
    this.editAddressData = item;
    this.addressType = item.addressType;
    this.showAddressPopup = true;
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

  getCartList() {
    const userCookie = this.common.getCookie('sagar');
    const isLoggedIn = !!userCookie;
    const userId = JSON.parse(userCookie).id;
    this.shopservice.currentCart(userId).subscribe((res) => {
      this.cartData = res
    })
  }
  updateAdd(data:address){
    console.warn(data); 
  }
}
