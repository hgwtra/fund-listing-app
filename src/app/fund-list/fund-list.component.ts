import { Component, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { FundService } from '../services/fund.service';
import { FundItems } from '../models/fundItems';
import { MatchedFundsPipe } from './matched-funds.pipe';

@Component({
  selector: 'app-fund-list',
  templateUrl: './fund-list.component.html',
  styleUrls: ['./fund-list.component.css'],
})
export class FundListComponent {
  funds: FundItems[] = [];
  searchedText: string = '';
  @Output() fundsChanged = new EventEmitter<FundItems[]>();

  constructor(private fundService: FundService) {}

  ngOnInit(): void {
    this.displayFunds();
  }

  displayFunds() {
    this.fundService.getFunds().subscribe({
      next: (data) => {
        data = data[0].data; //get data from the api excluding the status
        //console.log('this is the fetched data', data);
        this.funds = data.map((item: any) => {
          //console.log(item);
          let fundItem = new FundItems();
          fundItem.fundName = item.fundName;
          fundItem.fundType = item.fundType;
          fundItem.fundCompany = item.fundCompany !== null ? item.fundCompany : 'N/A';
          fundItem.change1m = item.change1m !== null ? item.change1m : '—'; //if the value is null, display a dash
          fundItem.change3m = item.change3m !== null ? item.change3m : '—';
          fundItem.change1y = item.change1y !== null ? item.change1y : '—';
          fundItem.change3y = item.change3y !== null ? item.change3y : '—';
          fundItem.currency = item.currency;
          return fundItem;
        });
        this.fundsChanged.emit(this.funds);
      },
      error: (error: any) => {
        console.error('Error fetching api data', error);
      },
    });
  }

  //Search a fund by name
  onSearchEntered(inputValue: string) {
    this.searchedText = inputValue;
    //console.log('searched text', this.searchedText);
  }
}
