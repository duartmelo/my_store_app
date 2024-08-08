import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Products, ProductsResponse } from '@interfaces/Products.interface';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss'
})
export class ProductInfoComponent {
  @Input() product: Products | undefined = undefined;
}
