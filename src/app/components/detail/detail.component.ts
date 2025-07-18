import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";


@Component({
  selector: 'app-detail',
  imports: [RouterLink, HeaderComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
}
