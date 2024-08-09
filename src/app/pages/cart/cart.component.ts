import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartProducts } from '@interfaces/Cart.interface';
import { CartService } from 'services/cart-services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cartProduts: CartProducts[] = []
  totalCart = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartProduts = this.cartService.getCart();
    this.getTotal();
  }

  getTotal() {
    this.cartProduts.forEach(cartProdut => {
      this.totalCart += (cartProdut.quantity * cartProdut.product.price);
    });
  }

}
