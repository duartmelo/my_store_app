import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Products } from '@interfaces/Products.interface';
import { NgbCarouselModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ProductsService } from 'services/products/products.service';
import { TableProductDetailsComponent } from "../../components/table-product-details/table-product-details.component";
import { ValidationMessageComponent } from '@components/index';
import { FormsModule } from '@angular/forms';
import { CartService } from 'services/cart-services/cart.service';
import { NotificationService } from 'services/notification/notification.service';
import { NotificationType } from '@interfaces/Notification.interface';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink, NgbCarouselModule, CommonModule, TableProductDetailsComponent, ValidationMessageComponent, FormsModule, NgbRatingModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Products | undefined = undefined;

  productId: number = 0;
  hasError: boolean = false;
  quantity: number = 1;

  productDetailsSubscription = new Subscription();
  routeSubscription = new Subscription();

  commonClasses: string = "text-white rounded-md p-3 w-72"

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(param => this.productId = param['id']);
    this.getProductDetails();
  }

  getProductDetails() {
    this.productDetailsSubscription = this.productsService.getProductDetails(this.productId).subscribe({
      next: response => this.product = response,
    })
  }

  addToCart(product: Products) {
    if(this.quantity < 1) {
      this.hasError = true;
      return;
    }
    this.hasError = false;
    this.cartService.addProductToCart({product, quantity: Number(this.quantity)});
    this.notification.setNotification({
      message: "Product added to your cart",
      title: "",
      type: NotificationType.SUCCESS,
      class: this.commonClasses + " bg-green-500"
    })
  }

  ngOnDestroy(): void {
    this.productDetailsSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
