import { Component, OnInit } from '@angular/core';
import { ICart, ICartItem } from 'src/app/models/cart.model';

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

  constructor() {
  }
  ngOnInit(): void {
    this.dataSource = this.cart.items;
  }

  getTotal(items:Array<ICartItem>):number{
    return items.
    map((item) => item.price * item.quantity).
    reduce((prev,curr) => prev +curr, 0);
  }

}
