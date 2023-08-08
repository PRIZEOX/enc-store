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


  getProducts(): void {
    this.productSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  onColumnsCountChange(colsNum:number):void{
    this.cols = colsNum;
    this.rowHeight = ROW_HEIGHT[this.cols];
  }

  onShownCategory(newCategory : string): void {
    this.category = newCategory;
    this.getProducts();
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

  onitemCountChange(count:number): void{
    this.count = count.toString();
    this.getProducts(); 
  }

  onsortChange(newSort:string): void{
    this.sort = newSort;
    this.getProducts();
  }
}
