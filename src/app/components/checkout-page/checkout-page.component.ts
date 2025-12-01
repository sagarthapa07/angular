import { NgIf, NgForOf, DecimalPipe } from "@angular/common";
import { ShopService } from "../../core/services/shop/shop.service";
import { FormsModule, NgForm } from "@angular/forms";
import { Component } from "@angular/core";
import { address, cart } from "../../dataType";
import { CommonService } from "../../core/services/common/common.service";

@Component({
  selector: 'app-checkout-page',
  imports: [NgIf, FormsModule, NgForOf, DecimalPipe],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent {

  showAddPopup = false;
  showEditPopup = false;
  cartData: any[] = [];
  showPopup = false;
  alertMessage = '';
  isEditMode = false;
  editAddressData: any = null;
  addressType: string = 'home';
  addressList: address[] | undefined;
  subTotal: number = 0;
  discount: number = 0;
  gst: number = 0;
  grandTotal: number = 0;
  totalItems: number = 0;

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
    this.loadCartData();
  }
  loadCartData() {
    const userCookie = this.common.getCookie('sagar');
    if (!userCookie) return;

    const userId = JSON.parse(userCookie).id;

    this.shopservice.currentCart(userId).subscribe((result) => {
      this.cartData = result || [];

      this.calculateTotals();

      if (!this.cartData.length) {
        this.showA("Your cart is empty.");
      }
    });
  }

  loadAddressList() {
    this.shopservice.addressList().subscribe(res => {
      this.addressList = res;
    });
  }
  openAddForm() {
    this.isEditMode = false;
    this.editAddressData = null;
    this.showAddPopup = true;
    this.showEditPopup = false;
  }

  openEditForm(item: address) {
    this.isEditMode = true;
    this.editAddressData = { ...item };
    console.log("Edited item:", this.editAddressData);
    this.addressType = item.addressType;
    this.showEditPopup = true;
    this.showAddPopup = false;
  }

  closeAddressForm() {
    this.showAddPopup = false;
    this.showEditPopup = false;
  }

  showA(message: string) {
    this.alertMessage = message;
    this.showPopup = true;

    setTimeout(() => {
      this.showPopup = false;
    }, 2000);
  }

  submit(form: NgForm) {
    if (!form.valid || !this.addressType) {
      this.showA("Please fill all required fields.");
      return;
    }
    const formData = {
      ...form.value,
      addressType: this.addressType,
      id: this.editAddressData?.id
    };
    if (!this.isEditMode) {
      this.shopservice.addAddress(formData).subscribe(() => {
        this.showA("Address Saved Successfully!");
        this.loadAddressList();
        this.closeAddressForm();
      });
      return;
    }
    this.shopservice.updateAddress(formData).subscribe(() => {
      this.showA("Address Updated Successfully!");
      this.loadAddressList();
      this.closeAddressForm();
    });
  }

  deleteAddress(item: address) {
    debugger
    console.log("DELETE PRESS:", item);
    console.log("ID FOUND:", item.id);
    if (!item.id) {
      this.showA("Delete failed: ID not found!");
      return;
    }
    this.shopservice.deleteAddress(item).subscribe({
      next: () => {
        this.showA("Address Deleted Successfully!");
        this.closeAddressForm()
        this.loadAddressList();
      },
      error: () => this.showA("Failed to delete address!")
    });
  }
  calculateTotals() {
    this.subTotal = 0;
    this.discount = 0;
    this.gst = 0;
    this.grandTotal = 0;
    this.totalItems = 0;

    if (!this.cartData.length) return;

    this.cartData.forEach((item) => {
      const price = item.price || 0;
      const discount = item.discountPercentage || 0;
      const qty = item.quantity || 1;

      const discountedAmount = (price * discount) / 100;
      const discountedPrice = price - discountedAmount;

      this.subTotal += price * qty;
      this.discount += discountedAmount * qty;
      this.totalItems += qty;
    });

    this.gst = (this.subTotal - this.discount) * 0.18;

    this.grandTotal = (this.subTotal - this.discount) + this.gst;

    console.log('Subtotal:', this.subTotal);
    console.log('Discount:', this.discount);
    console.log('GST:', this.gst);
    console.log('GrandTotal:', this.grandTotal);
  }



}