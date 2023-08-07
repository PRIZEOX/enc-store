import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICart, ICartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart  = new BehaviorSubject<ICart>({items: []})
  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item: ICartItem):void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);

    if(itemInCart){
      itemInCart.quantity +=1;
    }else{
      items.push(item);
    }
    this.cart.next({items});

    this._snackBar.open('1 item added to cart', 'Ok', {duration: 3000});
    console.log(this.cart.value);
  }

  getTotal(items:Array<ICartItem>):number{
    return items.
    map((item) => item.price * item.quantity).
    reduce((prev,curr) => prev +curr, 0);
  }

  clearCart(){
    this.cart.next({items: []});
    this._snackBar.open('Cart was cleared', 'Ok', {duration:4000});
  }

  removeFromCart(item: ICartItem, update= true) : Array<ICartItem>  {
    const filteredItems = this.cart.value.items.filter((_item)=> 
       _item.id !== item.id
    );
    if(update){
      this.cart.next({items: filteredItems});
      this._snackBar.open('1 item removed from cart', 'Ok', {duration: 3000})
    }
    return filteredItems;
  }

  reduceQuantity(item : ICartItem) : void{
    let itemForRemove : ICartItem | undefined;
    let filtered = this.cart.value.items.map((_item) => {
      if(_item.id == item.id){
        _item.quantity--;

        if(_item.quantity === 0){
          itemForRemove = _item;
        }
      }
      return _item
    });

    if(itemForRemove){
      filtered = this.removeFromCart(itemForRemove, false);
    }

    this.cart.next({items: filtered});
    this._snackBar.open('1 item removed from cart', 'Ok', {duration: 3000})
  }
}
