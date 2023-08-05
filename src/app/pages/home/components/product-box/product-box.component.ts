import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl:'./product-box.component.html',
})
export class ProductBoxComponent implements OnInit{
  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter();
  product: IProduct | undefined = {
    id: 1, 
    title: 'Snickers',
    price: 150,
    category: 'shoes',
    desc: 'Description',
    image: 'https://via.placeholder.com/150',
  } ; 
  ngOnInit(): void {
    
  }

  onAddToCart(){
    this.addToCart.emit(this.product);
  }

}
