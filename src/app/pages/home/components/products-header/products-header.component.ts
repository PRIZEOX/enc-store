import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
})
export class ProductsHeaderComponent implements OnInit{
  constructor(){}

  sort = 'desc'
  itemsShowCount = 12
  ngOnInit(): void {
   
  }

  onSortUpdated(newSort: string):void{
    this.sort = newSort;
  }

  oncolumnsUpdated(colsNum: number){
    
  }

  onItemsUpdated(count :number): void{
    this.itemsShowCount = count;
  }

}
