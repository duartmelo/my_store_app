import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-successful',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page-successful.component.html',
  styleUrl: './page-successful.component.scss'
})
export class PageSuccessfulComponent implements AfterViewInit {
  isLoading = true;

  ngAfterViewInit() {
      setTimeout(() => {this.isLoading = false},3000)
  }
}
