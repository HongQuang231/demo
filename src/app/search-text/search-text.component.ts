import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-text',
  templateUrl: './search-text.component.html',
  styleUrls: ['./search-text.component.scss']
})
export class SearchTextComponent implements OnInit {
  searchText?: string;
  @Output() returnSearch = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  searchByTextComponent() {
    this.returnSearch.emit(this.searchText);
  }

}
