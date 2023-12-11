import { Component } from '@angular/core';
import { FundService } from '../services/fund.service';
import { FundItems } from '../models/fundItems';

@Component({
  selector: 'app-fund-list',
  templateUrl: './fund-list.component.html',
  styleUrls: ['./fund-list.component.css'],
})
export class FundListComponent {
  funds: FundItems[] = [];

  constructor(private fundService: FundService) {}

  ngOnInit(): void {
    this.displayFunds();
  }

  displayFunds() {
    this.fundService.getFunds().subscribe({
      next: (data) => {
        data = data[0].data; //get data from the api excluding the status
        this.funds = data.map((item: any) => {
          console.log(item);
          let fundItem = new FundItems();
          fundItem.fundName = item.fundName;
          fundItem.fundType = item.fundType;
          fundItem.fundCompany = item.fundCompany;
          fundItem.change1m = item.change1m;
          fundItem.change3m = item.change3m;
          fundItem.change1y = item.change1y;
          return fundItem;
        });
      },
      error: (error: any) => {
        console.error('Error fetching api data', error);
      },
    });
  }

  //TODO:
  //Search a fund by name
  //Filter funds by fund type or fund company
  //Display changes: Performance(1y), changes 1m 3m 3y
  //Display fund details when a fund is clicked
  //Add more comments + documentation (readme)
  //Host the project
  //unit test if possible
}
