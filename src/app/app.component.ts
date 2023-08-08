import { Component, OnInit } from '@angular/core';
import { ICart } from './models/cart.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) =>
      this.cart = _cart
    );
  }
  constructor(
    private cartService : CartService
  ){}

  cart: ICart = {items: []};

}
