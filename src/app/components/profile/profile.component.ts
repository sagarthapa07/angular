import { DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {
  address,
  cart,
  Items,
  orders,
  Product,
  wishlist,
} from '../../dataType';
import { ShopService } from '../../core/services/shop/shop.service';
import { CommonService } from '../../core/services/common/common.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoginService } from '../../core/services/login/login.service';

@Component({
  selector: 'app-profile',
  imports: [
    NgFor,
    NgIf,
    NgbDropdownModule,
    FormsModule,
    RouterLink,
    DecimalPipe,
    DatePipe,
  ],
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
  cartItem: any[] = [];

  // Address
  addressListData: address[] = [];
  editAddressId: number | null = null;

  // Addess From
  showAddPopup = false;
  // showEditPopup = false;
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

  // Orders
  orders: orders[] = [];

  // Logout
  cartItems = 0;

  //Filter
  filteredOrders: orders[] = [];

  showInvoice = false;
  selectedOrder: orders | null = null;

  constructor(
    private shopService: ShopService,
    private common: CommonService,
    private login: LoginService,
    private route: ActivatedRoute
  ) {}

  select(optionType: string, value: string) {
    if (optionType === 'status') {
      this.selectedStatus = value;
    }
    if (optionType === 'time') {
      this.selectedTime = value;
    }
    this.applyFilters();
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
    this.route.queryParams.subscribe((params) => {
      if (params['tab']) {
        this.activeItem = params['tab'];
      }
    });

    this.shopService.addressList().subscribe({
      next: (res) => {
        this.addressList = res;
      },
      error: (err) => {
        this.showA('Failed to load address list.');
        console.error(err);
      },
    });
    this.loadCartState();
    this.loadWishlistItems();
    this.loadAddressList();
    this.loadOrders();
  }

  setActive(name: string) {
    debugger
    this.activeItem = name;
    history.replaceState(null, '', `/profile?tab=${name}`);
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
  removeWishlistItem(productId: number): void {
    const item = this.wishlistData.find((w) => w.productId === productId);
    if (!item?.id) return;
    this.shopService.removeWishlist(item.id).subscribe(() => {
      this.wishlistProducts = this.wishlistProducts.filter(
        (p) => p.id !== productId
      );
      this.wishlistData = this.wishlistData.filter(
        (w) => w.productId !== productId
      );
    });
  }

  isProductInCart(id: number) {
    return this.cartItem.some((val: any) => val.productId === id);
  }

  loadCartState() {
    // Guest user (no cookie)
    if (!this.common.getCookie('sagar')) {
      const localCart = localStorage.getItem('localCart');
      if (localCart) {
        const items = JSON.parse(localCart);
        this.cartItem = items.map((item: Product) => {
          return {
            productId: item.productId,
            id: item.id,
          };
        });
      }
    }

    // Logged-in user
    else {
      const user = this.common.getCookie('sagar');
      const userId = JSON.parse(user).id;

      this.shopService.getCartList(userId);

      this.shopService.cartData.subscribe((cartList) => {
        //  this.cartItemsIds = cartList.map((item: Product) => + item.productId);
        this.cartItem = cartList.map((item: Product) => {
          return {
            productId: item.productId,
            id: item.id,
          };
        });
      });
    }
  }

  AddToCart(item: any) {
    const productId = item.productId ?? item.id;

    if (this.isProductInCart(productId)) {
      this.showA('Product already in cart!');
      return;
    }

    const productData: Product = {
      ...item,
      productId: productId,
      quantity: 1,
      availabilityStatus: 'In stock',
    };

    if (!this.common.getCookie('sagar')) {
      this.shopService.localAddToCart(productData);

      // refresh cart state
      this.loadCartState();

      this.showA('Added to cart successfully!');
      return;
    }

    const user = this.common.getCookie('sagar');
    const userId = JSON.parse(user).id;

    const cartData: cart = {
      ...productData,
      userId,
    };

    delete (cartData as any).id;

    this.shopService.addToCartAPI(cartData).subscribe({
      next: () => {
        this.shopService.getCartList(userId);
        this.showA('Added to cart successfully!');
      },
      error: () => {
        this.showA('Failed to add product to cart!');
      },
    });
  }

  removeToCart(productId: number) {
    let cartProduct = this.cartItem.filter((val) => val.productId == productId);
    const user = this.common.getCookie('sagar');

    if (user) {
      const userId = JSON.parse(user).id;

      this.shopService.removeToCart(cartProduct[0]?.id).subscribe((res) => {
        if (res) {
          this.cartItem = this.cartItem.filter(
            (val) => val.productId !== cartProduct[0]?.productId
          );

          this.shopService.getCartList(userId);
          this.showA('Removed from cart!');
        }
      });
    } else {
      this.shopService.removeItemFromCart(cartProduct[0]?.productId);

      this.cartItem = this.cartItem.filter(
        (val) => val.productId !== cartProduct[0]?.productId
      );

      const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
      this.shopService.cartData.emit(localCart);
      this.showA('Removed from cart!');
    }
  }

  // Address
  loadAddressList() {
    this.shopService.addressList().subscribe((res) => {
      this.addressListData = res;
    });
  }
  deleteAddressItem(item: address) {
    this.shopService.deleteAddress(item).subscribe(() => {
      this.addressListData = this.addressListData.filter(
        (addr) => addr.id !== item.id
      );
      this.closeAddressForm();
      this.showA('Address Deleted Successfully!');
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
    this.addressType = 'home';
    this.showAddPopup = true;
  }
  openEditForm(item: address) {
    this.isEditMode = true;
    this.editAddressData = { ...item };
    this.addressType = item.addressType;
    this.showAddPopup = true;
  }

  closeAddressForm() {
    this.showAddPopup = false;
    this.isEditMode = false;
    this.editAddressData = null;
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
      this.showA('Please fill all required fields.');
      return;
    }
    const formData = {
      ...form.value,
      addressType: this.addressType,
      id: this.editAddressData?.id,
    };
    if (!this.isEditMode) {
      this.shopService.addAddress(formData).subscribe(() => {
        this.showA('Address Saved Successfully!');
        this.loadAddressList();
        this.closeAddressForm();
      });
      return;
    }
    this.shopService.updateAddress(formData).subscribe(() => {
      this.showA('Address Updated Successfully!');
      this.loadAddressList();
      this.closeAddressForm();
    });
  }

  applyFilters() {
    let result = [...this.orders];

    if (this.selectedStatus !== 'All') {
      result = result.filter((order) => order.status === this.selectedStatus);
    }

    if (this.selectedTime === 'Newest First') {
      result.sort((a, b) => {
        return (
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        );
      });
    }

    if (this.selectedTime === 'Oldest First') {
      result.sort((a, b) => {
        return (
          new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
        );
      });
    }

    this.filteredOrders = result;
  }

  loadOrders() {
    const userCookie = this.common.getCookie('sagar');
    if (!userCookie) return;

    const userId = JSON.parse(userCookie).id;

    this.shopService.getOrdersByUser(userId).subscribe({
      next: (res) => {
        this.orders = res;
        this.applyFilters();
      },
      error: () => {
        this.showA('Failed to load orders!');
      },
    });
  }

  viewInvoice(orderId?: number) {
    if (!orderId) {
      this.showA('Invalid order id');
      return;
    }

    this.shopService.getOrderById(orderId).subscribe((res) => {
      this.selectedOrder = res;
      this.showInvoice = true;
    });
  }

  logout() {
    this.cartItems = 0;
    this.shopService.cartData.emit([]);
    this.login.logOutUser();
  }
}
