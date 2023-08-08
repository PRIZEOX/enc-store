import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filter',
  templateUrl:'./filter.component.html',
})
export class FilterComponent  implements OnInit{
  @Output() showCategory = new EventEmitter<string>();
  categories: string[] | undefined;
  categoriesSubscription: Subscription | undefined;
  
  constructor(
    private storeService: StoreService,
  ){
  }

  getCategories(){
    this.categoriesSubscription = this.storeService.getAllCategories().subscribe((res: Array<string>)=> this.categories = res)
  }

  ngOnInit(): void {
    this.getCategories();
  }

  onShowCategory(category:string){
    this.showCategory.emit(category);
  }

}

