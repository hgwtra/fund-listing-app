import { Component, Input } from '@angular/core';
import { FundItems } from '../models/fundItems';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  @Input() funds: FundItems[] = [];
  defaultFilterByFundCompany: string = 'DEFAULT';

  ngOnChanges() {
    // console.log('funds in filter component', this.funds);
    this.filterByFundCompany();
  }

  // Filter funds by fund company
  filterByFundCompany() {
    if (this.defaultFilterByFundCompany === 'DEFAULT') {
      // If 'All Companies' selected, show all funds
      // console.log('Showing all funds');
    } else {
      // Filter funds based on the selected fund company
      this.funds = this.funds.filter((fund) =>
        fund.fundCompany.toLowerCase().includes(this.defaultFilterByFundCompany.toLowerCase())
      );
    }
  }

  // Filter funds by fund type
}
