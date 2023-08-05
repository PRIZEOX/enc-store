import { Component, OnInit, Input } from '@angular/core';
import { ICart, ICartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl:'./header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  @Input()
  get cart(): ICart {
    return this._cart;
  }
  set cart(cart: ICart){
    this._cart = cart;

    this.itemsQuantity = cart.items.
    map((item) => item.quantity).
    reduce((prev, cur) => prev + cur, 0);
  }

  private _cart : ICart = { items: []};
  itemsQuantity : number = 0;
  constructor(
    private cartService: CartService
  ){}

  getTotal(items: Array<ICartItem>): number{
    return this.cartService.getTotal(items);
  }

  onClearCart(){
    this.cartService.clearCart();
  }

}
