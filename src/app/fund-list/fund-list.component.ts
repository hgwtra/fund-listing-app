import {
  Component,
  ChangeDetectorRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { FundService } from '../services/fund.service';
import { FundItems } from '../models/fundItems';

@Component({
  selector: 'app-fund-list',
  templateUrl: './fund-list.component.html',
  styleUrls: ['./fund-list.component.css'],
})
export class FundListComponent {
  funds: FundItems[] = [];
  searchedText: string = '';
  expandedIndex: number = -1; // -1 means no row is expanded
  expandedState: boolean = false;
  @Output() fundsChanged = new EventEmitter<FundItems[]>();

  constructor(private fundService: FundService) {}

  ngOnInit(): void {
    this.displayFunds();
  }

  //display funds and emit the data for filtering
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
          fundItem.fundCompany =
            item.fundCompany !== null ? item.fundCompany : 'N/A';
          fundItem.change1m = item.change1m !== null ? item.change1m : '—'; //if the value is null, display a dash
          fundItem.change3m = item.change3m !== null ? item.change3m : '—';
          fundItem.change1y = item.change1y !== null ? item.change1y : '—';
          fundItem.change3y = item.change3y !== null ? item.change3y : '—';
          fundItem.currency = item.currency;
          fundItem.availableForMonthlySaving =
            item.availableForMonthlySaving !== null
              ? item.availableForMonthlySaving
              : '—';
          fundItem.documentLinks = item.documents;
          fundItem.rate = item.rate !== null ? item.rate : 'N/A';
          fundItem.yearHigh = item.yearHigh !== null ? item.yearHigh : 'N/A';
          fundItem.yearLow = item.yearLow !== null ? item.yearLow : 'N/A';
          console.log('this is the fund documents', fundItem.documentLinks);

          //convert the values to number and round to 2 decimal places
          if (typeof fundItem.rate === 'number') {
            fundItem.rate = Number(fundItem.rate.toFixed(2));
          }

          if (typeof fundItem.yearHigh === 'number') {
            fundItem.yearHigh = Number(fundItem.yearHigh.toFixed(2));
          }

          if (typeof fundItem.yearLow === 'number') {
            fundItem.yearLow = Number(fundItem.yearLow.toFixed(2));
          }

          return fundItem;
        });
        this.funds = [...this.funds];
        this.fundsChanged.emit(this.funds);
        //console.log('this is the emited data', this.funds);
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

  // Toggle for dropdown
  toggleContent(index: number) {
    if (this.expandedIndex === index) {
      this.expandedIndex = -1;
    } else {
      this.expandedIndex = index;
    }
  }
}
