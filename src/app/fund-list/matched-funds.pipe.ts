// responsible for sorting the funds array based on the search criteria
// pushing the matched items to the top temporarily during the search
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matchedFunds',
})

export class MatchedFundsPipe implements PipeTransform {
  transform(funds: any[], searchText: string): any[] {
    if (!funds || !searchText) {
      return funds;
    }

    //filter the funds array based on the search criteria
    const matchedFunds = funds.filter((fund) =>
      fund.fundName.toLowerCase().includes(searchText.toLowerCase())
    );


    return matchedFunds;
  }
}
