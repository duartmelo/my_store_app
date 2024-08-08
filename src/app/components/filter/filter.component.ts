import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgClass, NgbDropdownModule, NgbModalModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Input() categories: Array<string> = [];
  @Output() categoryEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() sortEmitter: EventEmitter<string> = new EventEmitter<string>();

  sortOptions: Array<string> = ["Title", "Price", "Discount", "Rating"]
  sortActive: string = '';
  categoryActive: string = '';

  OnCategorySelect(category: string) {
    this.setCategoryActive(category);
    this.categoryEmitter.emit(this.categoryActive);
  }

  setCategoryActive(category: string) {
    if(this.categoryActive === category) {
      this.categoryActive = "";
    } else {
      this.categoryActive = category;
    }
  }

  OnSelectSort(sort: string) {
    this.setSortActive(sort);
    this.sortEmitter.emit(this.sortActive);
  }

  setSortActive(sort: string) {
    if(this.sortActive === sort) {
      this.sortActive = "";
    } else {
      this.sortActive = sort;
    }
  }

}
