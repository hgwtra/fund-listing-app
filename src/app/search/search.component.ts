import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchedText: string = '';
  @Output()
  searchedTextChanged: EventEmitter<string> = new EventEmitter<string>();

  //Search a fund by name
  onSearchChanged() {
    this.searchedTextChanged.emit(this.searchedText);
  }
}
