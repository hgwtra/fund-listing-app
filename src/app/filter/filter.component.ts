import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  OnInit,
} from '@angular/core';
import { FundItems } from '../models/fundItems';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnChanges, OnInit {
  @Input() funds: FundItems[] = [];
  defaultFilterByFundCompany: string = 'DEFAULT';
  defaultFilterByFundType: string = 'DEFAULT';
  @Output() fundsChanged = new EventEmitter<FundItems[]>();

  filteredFunds: FundItems[] = [];

  ngOnChanges() {
    this.filter();
  }

  ngOnInit() {
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

  uniqueFundCompanies(funds: FundItems[]): string[] {
    const uniqueCompanies = [...new Set(funds.map((fund) => fund.fundCompany))];
    return uniqueCompanies.filter((company) => company !== 'N/A');
  }

  uniqueFundTypes(funds: FundItems[]): string[] {
    const uniqueTypes = [...new Set(funds.map((fund) => fund.fundType))];
    return uniqueTypes.filter((type) => type !== 'N/A');
  }
}
