import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-text',
  templateUrl: './search-text.component.html',
  styleUrls: ['./search-text.component.scss']
})
export class SearchTextComponent implements OnInit {
  @Output() searchByText = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  searchByTextComponent(searchText: string) {
    this.searchByText.emit(searchText);
  }
}
