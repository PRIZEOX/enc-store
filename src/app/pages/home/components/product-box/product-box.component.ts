import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl:'./product-box.component.html',
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter();
  @Input() product: IProduct | undefined ; 

  constructor() {
  }
  onAddToCart(){
    this.addToCart.emit(this.product);
  }

}
