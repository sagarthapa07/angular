import { Component } from '@angular/core';
import { TestService } from '../../core/services/test/test.service';



@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {
  total: number = 0;

  constructor(private test: TestService) {}

  Cal(a: number, b: number) {
    this.total = this.test.calcution(a, b);
  }
}
