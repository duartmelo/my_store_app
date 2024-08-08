import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, Subject, tap,  } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgbDropdownModule, NgClass, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  @Output() searchEmmiter: EventEmitter<string> = new EventEmitter<string>();

  searchSubject$: Subject<string> = new Subject<string>();
  searchInput: string = '';

  ngOnInit() {
    this.searchSubject$.pipe(debounceTime(1000), distinctUntilChanged()).subscribe({
      next: search => this.searchEmmiter.emit(search),
    })
  }

  OnSearchInput(search: Event) {
    this.searchInput = (search.target as HTMLInputElement).value;
    this.searchSubject$.next(this.searchInput);
  }

  clearSearch() {
    this.searchInput = "";
    this.searchSubject$.next(this.searchInput);
  }
}
