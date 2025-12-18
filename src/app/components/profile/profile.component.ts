import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { address, Product, wishlist } from '../../dataType';
import { ShopService } from '../../core/services/shop/shop.service';

@Component({
  selector: 'app-profile',
  imports: [NgFor, NgIf, NgbDropdownModule, FormsModule,JsonPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  statusOptions = ['All', 'Ordered', 'Shipped', 'Delivered', 'Cancelled'];
  timeOptions = ['Newest First', 'Oldest First'];

  selectedStatus = 'All';
  selectedTime = 'Newest First';

  editName = false;
  firstName = 'Sagar';
  lastName = 'Thapa';
  // Password Fields
  editPass = false;
  newPassword = '';
  confirmPassword = '';

  // Contact Fields
  editContact = false;
  email = 'sagar@gmail.com';
  phone = '9876543210';

  //Wishlist
  wishlistData: wishlist[] = [];
  wishlistProducts: Product[] = [];

  // Address
  addressListData: address[] = [];
  editAddressId: number | null = null;



  // Addess From
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

  constructor(private shopService: ShopService) {}

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

  ngOnInit() {
    this.loadWishlistItems();
    this.loadAddresses();
  }

  toggleNameEdit() {
    this.editName = !this.editName;
  }
  toggleContactEdit() {
    this.editContact = !this.editContact;
  }
  togglePasswordEdit() {
    this.editPass = !this.editPass;
  }
  loadWishlistItems() {
    this.shopService.getWishlist().subscribe((wishlist) => {
      this.wishlistData = wishlist;

      // product details load (dummyjson)
      this.wishlistProducts = [];

      wishlist.forEach((w) => {
        this.shopService
          .getProduct(w.productId.toString())
          .subscribe((prod) => {
            this.wishlistProducts.push(prod);
          });
      });
    });
  }
  removeWishlistItem(productId: number) {
    const wishItem = this.wishlistData.find((w) => w.productId === productId);
    if (!wishItem?.id) return;

    this.shopService.removeWishlist(wishItem.id).subscribe(() => {
      this.wishlistProducts = this.wishlistProducts.filter(
        (p) => p.id !== productId
      );
      this.wishlistData = this.wishlistData.filter(
        (w) => w.productId !== productId
      );
    });
  }



  // Address 
  loadAddresses() {
    this.shopService.addressList().subscribe((res) => {
      this.addressListData = res;
    });
  }
  deleteAddressItem(item: address) {
    this.shopService.deleteAddress(item).subscribe(() => {
      this.addressListData = this.addressListData.filter(
        (addr) => addr.id !== item.id
      );
    });
  }

  editAddress(item: address) {
    this.editAddressId = item.id!;
  }

  saveAddress(item: address) {
    this.shopService.updateAddress(item).subscribe(() => {
      this.editAddressId = null;
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
      this.shopService.addAddress(formData).subscribe(() => {
        this.showA("Address Saved Successfully!");
        this.loadAddresses();
        this.closeAddressForm();
      });
      return;
    }
    this.shopService.updateAddress(formData).subscribe(() => {
      this.showA("Address Updated Successfully!");
      this.loadAddresses();
      this.closeAddressForm();
    });
  }



}
