import { Component } from '@angular/core';
import { NgbModule, NgbNavItem, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  imports: [NgbNavItem, NgbNavOutlet,NgbModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
active = 1;
}
