import { Component, EventEmitter, Output } from '@angular/core';
import { FundService } from '../services/fund.service';
import { FundItems } from '../models/fundItems';

@Component({
  selector: 'app-fund-list',
  templateUrl: './fund-list.component.html',
  styleUrls: ['./fund-list.component.css'],
})
export class FundListComponent {
  funds: FundItems[] = [];
  filteredFunds: FundItems[] = [];
  searchedText: string = '';
  expandedIndex: number = -1; // -1 means no row is expanded
  expandedState: boolean = false;
  currentView: string = 'overview';
  watchlistArray: string[] = [];

  constructor(private fundService: FundService) {}

  ngOnInit(): void {
    this.displayFunds();
    this.getWatchList();
    this.getView();
  }

  //display funds and emit the data for filtering
  displayFunds() {
    this.fundService.getFunds().subscribe({
      next: (data) => {
        data = data[0].data; //get data from the api excluding the status
        this.funds = data.map((item: any) => {
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

          if (this.watchlistArray.length > 0) {
            //loop through the watchlist array and check if the fund is in the watchlist
            //if the fund is in the watchlist, set the allowedForWatchList = item.permissions.allowedForWatchlist = false
            //else set the allowedForWatchList = item.permissions.allowedForWatchlist = true
            this.watchlistArray.forEach((element) => {
              if (
                element === item.fundName &&
                item.permissions.allowedForWatchlist === true
              ) {
                item.permissions.allowedForWatchlist = false;
                fundItem.allowedForWatchList =
                  item.permissions.allowedForWatchlist;
              } else {
                fundItem.allowedForWatchList =
                  item.permissions.allowedForWatchlist;
              }
            });

            //if the fund is not in the watchlist, set the allowedForWatchList = item.permissions.allowedForWatchlist = true
          } else {
            fundItem.allowedForWatchList = item.permissions.allowedForWatchlist;
          }

          //convert the rate, yearHigh and yearLow to 2 decimal places
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
      },
      error: (error: any) => {
        console.error('Error fetching api data', error);
      },
    });
  }

  //Search a fund by name
  onSearchEntered(inputValue: string) {
    this.searchedText = inputValue;
  }

  // Toggle for dropdown
  toggleContent(index: number) {
    if (this.expandedIndex === index) {
      this.expandedIndex = -1;
    } else {
      this.expandedIndex = index;
    }
  }

  //Toggle for nav bar
  toggleView(view: string): void {
    this.currentView = view;
    this.setView(view);
  }

  //set current view to local storage
  setView(view: string) {
    localStorage.setItem('currentView', view);
  }

  //get current view from local storage
  getView() {
    if (localStorage.getItem('currentView') === null) {
      this.currentView = 'overview';
    } else {
      this.currentView = localStorage.getItem('currentView')!;
    }
  }

  // Filter funds by fund type
  fundsChangedHandler(eventData: FundItems[]) {
    this.filteredFunds = [...eventData];
  }

  // ADDING, GETTING AND REMOVING FROM WATCHLIST

  // Add fund to watchlist
  addToWatchList() {
    let fundName = this.funds[this.expandedIndex].fundName;

    // If the fund is already in the watchlist, do not add it again
    if (this.watchlistArray.includes(fundName)) {
      console.log('Fund already in watchlist');
    } else {
      this.watchlistArray.push(fundName);
      localStorage.setItem('watchlist', JSON.stringify(this.watchlistArray));
      this.funds[this.expandedIndex].allowedForWatchList = false;
    }
  }

  removeFromWatchList() {
    if (this.expandedIndex >= 0 && this.expandedIndex < this.funds.length) {
      let fundName = this.funds[this.expandedIndex].fundName;
      let index = this.watchlistArray.indexOf(fundName);

      if (index !== -1) {
        this.watchlistArray.splice(index, 1);
        localStorage.setItem('watchlist', JSON.stringify(this.watchlistArray));
        this.funds[this.expandedIndex].allowedForWatchList = true;
      }
    }
  }

  removeItemFromWatchList(fundName: string) {
    let index = this.funds.findIndex((fund) => fund.fundName === fundName);

    if (index !== -1) {
      this.watchlistArray.splice(this.watchlistArray.indexOf(fundName), 1);
      localStorage.setItem('watchlist', JSON.stringify(this.watchlistArray));
      this.funds[index].allowedForWatchList = true;
    }
  }

  getWatchList() {
    this.watchlistArray = localStorage.getItem('watchlist')
      ? JSON.parse(localStorage.getItem('watchlist')!)
      : [];
  }
}
