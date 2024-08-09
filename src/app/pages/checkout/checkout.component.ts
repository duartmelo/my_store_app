import { CurrencyPipe, NgClass, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationMessageComponent } from '@components/index';
import { CartProducts } from '@interfaces/Cart.interface';
import { UserData } from '@interfaces/Login.interface';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'services/authentication/authentication.service';
import { CartService } from 'services/cart-services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, ValidationMessageComponent, NgIf, NgClass, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit, OnDestroy{

  userDataSubscription = new Subscription();

  cartProduts: CartProducts[] = []
  totalCart = 0;

  userDataFormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required])
  })

  constructor(private authService: AuthenticationService, private cartService: CartService, private router: Router) {}

  ngOnInit() {
    const userId = this.authService.getUserId();

    if(userId) {
      this.userDataSubscription = this.authService.getUserById(userId).subscribe(
        {
          next: response => this.populateForm(response),
        }
      )
    }

    this.cartProduts = this.cartService.getCart();
    this.getTotal();
  }

  getTotal() {
    this.cartProduts.forEach(cartProdut => {
      this.totalCart += (cartProdut.quantity * cartProdut.product.price);
    });
  }

  populateForm(response: UserData) {
    this.userDataFormGroup.setValue(
      {
        firstName: response.firstName,
        lastName: response.lastName,
        address: response.address.address,
        city: response.address.city,
        email: response.email,
        phone: response.phone,
        postalCode: response.address.postalCode
      }
    )
  }

  finishBuy() {
    this.cartService.clearCart();
    this.router.navigateByUrl("/success");
  }

  ngOnDestroy() {
    this.userDataSubscription.unsubscribe();
  }

}
