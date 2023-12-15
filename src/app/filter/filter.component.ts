import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges
} from '@angular/core';
import { FundItems } from '../models/fundItems';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnChanges {
  defaultFilterByFundCompany: string = 'DEFAULT';
  defaultFilterByFundType: string = 'DEFAULT';

  //get the original funds array from the parent component
  @Input() funds: FundItems[] = [];
  //emit the filtered funds array to the parent component
  @Output() fundsChanged = new EventEmitter<FundItems[]>();

  filteredFunds: FundItems[] = [];

  ngOnChanges() {
    this.filter();
  }

  filter() {
    this.filteredFunds = [...this.funds]; // Copy the original array

    if (this.defaultFilterByFundCompany !== 'DEFAULT') {
      this.filteredFunds = this.filteredFunds.filter((fund) =>
        fund.fundCompany
          .toLowerCase()
          .includes(this.defaultFilterByFundCompany.toLowerCase())
      );
    }

    if (this.defaultFilterByFundType !== 'DEFAULT') {
      this.filteredFunds = this.filteredFunds.filter((fund) =>
        fund.fundType
          .toLowerCase()
          .includes(this.defaultFilterByFundType.toLowerCase())
      );
    }

    this.fundsChanged.emit(this.filteredFunds);
  }

  //using set to remove duplicates
  uniqueFundCompanies(funds: FundItems[]): string[] {
    const uniqueCompanies = [...new Set(funds.map((fund) => fund.fundCompany))];
    //filter out the N/A value
    return uniqueCompanies.filter((company) => company !== 'N/A');
  }

  uniqueFundTypes(funds: FundItems[]): string[] {
    const uniqueTypes = [...new Set(funds.map((fund) => fund.fundType))];
    return uniqueTypes.filter((type) => type !== 'N/A');
  }
}
