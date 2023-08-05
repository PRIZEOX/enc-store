import { Component, OnInit } from '@angular/core';
import { ICart, ICartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl:'./cart.component.html',
})
export class CartComponent implements OnInit{
  cart:ICart = {items: [{
    product: 'https://via.placeholder.com/150',
    name: 'snickers',
    price: 150,
    quantity: 1,
    id: 1,
  },
  {
    product: 'https://via.placeholder.com/150',
    name: 'foot',
    price: 350,
    quantity: 2,
    id: 1,
  }
]};

  dataSource: Array<ICartItem> = [];
  displayedColumns : Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  constructor(
    private cartService : CartService
  ) {
  }
  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart : ICart) => {
      this.cart = _cart
      this.dataSource = this.cart.items;
    })

  }

  getTotal(items:Array<ICartItem>):number{
    return this.cartService.getTotal(items);
  }

  onClearCart(){
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: ICartItem){
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: ICartItem){
    this.cartService.addToCart(item);
  }

  onReduceQuantity(item: ICartItem){
    if(item.quantity <= 1){
      this.cartService.removeFromCart(item);
    }else{
      item.quantity = item.quantity - 1;
    }
    
  }

}
