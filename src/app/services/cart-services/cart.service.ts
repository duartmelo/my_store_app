import { Injectable } from '@angular/core';
import { CartProducts } from '@interfaces/Cart.interface';
import { Products } from '@interfaces/Products.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: CartProducts[] = [];

  constructor() { }

  getCart() {
    return this.cart;
  }

  addProductToCart(cartProduct: CartProducts) {
    const exists = this.cart.find(product => product.product.id === cartProduct.product.id);

    if(!exists) {
      this.cart.push(cartProduct);
    } else {
      this.addIfExist(cartProduct);
    }
  }

  clearCart() {
    this.cart = [];
  }

  private addIfExist(cartProduct: CartProducts) {
    if(this.cart.length > 0) {
      const index = this.cart.findIndex(cart => cart.product.id === cartProduct.product.id)
      this.cart[index].quantity = this.cart[index].quantity + cartProduct.quantity;
    }
  }

}
