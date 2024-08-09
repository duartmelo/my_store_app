import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Products } from '@interfaces/Products.interface';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table-product-details',
  standalone: true,
  imports: [NgbRatingModule, CommonModule],
  templateUrl: './table-product-details.component.html',
  styleUrl: './table-product-details.component.scss'
})
export class TableProductDetailsComponent {
  @Input() product: Products | undefined = undefined;
}
