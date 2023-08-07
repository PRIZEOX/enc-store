import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import {Subscription} from 'rxjs'
import { StoreService } from 'src/app/services/store.service';

const ROW_HEIGHT: {[id:number]: number} = { 1: 400, 3: 335, 4:350} 

@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy{
  constructor(
    private cartService: CartService,
    private storeService : StoreService,
  ){}

  pr = [{
    id: 1, 
    title: 'foot',
    price: 50,
    category: 'shoes',
    description: 'cool foot',
    image: 'no img',
  }
,
  {
    id: 2, 
    title: 'jeens',
    price: 20,
    category: 'clotch',
    description: 'cool jeens',
    image: 'no img',
  }]
  cols = 3;
  rowHeight = ROW_HEIGHT[this.cols];
  category = "";
  products: Array<IProduct> | undefined;
  sort = 'desc';
  count = '12';
  productSubscription : Subscription | undefined

  ngOnInit(): void {
    this.getProducts();
  }


  getProducts(){
    this.productSubscription = this.storeService.getAllProducts(this.count, this.sort).
      subscribe((_products) => {
        this.products = _products;
      });
  }

  onColumnsCountChange(colsNum:number):void{
    this.cols = colsNum;
    this.rowHeight = ROW_HEIGHT[this.cols];
  }

  onShownCategory(newCategory : string): void {
    this.category = newCategory;
  }

  onAddToCart(product: IProduct):void{
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    })
  }

  ngOnDestroy(): void {
   if(this.productSubscription){
    this.productSubscription.unsubscribe();
   }
  }
}
