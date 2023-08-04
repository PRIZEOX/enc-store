import { Component, OnInit } from '@angular/core';

const ROW_HEIGHT: {[id:number]: number} = { 1: 400, 3: 335, 4:350} 

@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit{
  constructor(){}
  cols = 3;
  rowHeight = ROW_HEIGHT[this.cols];
  category = "";
  ngOnInit(): void {
  }

  onColumnsCountChange(colsNum:number):void{
    this.cols = colsNum;
    this.rowHeight = ROW_HEIGHT[this.cols];
  }

  onShownCategory(newCategory : string): void {
    this.category = newCategory;
  }


}
