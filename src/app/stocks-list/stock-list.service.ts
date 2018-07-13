import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Stock } from '../stock.model';
import { SortingOrder } from './sorting.model';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable()
export class StockListService {

  private stocksURL = 'http://localhost:8090/v2/stocks/';
  private sortingURL = 'http://localhost:8090/v2/sorting-service/';
  private stocks: Stock[] = [];

  private headers = new Headers({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + this.authenticationService.getToken()
     });

  constructor(private http: Http,
              private authenticationService: AuthenticationService) {}

  getStocks() {
    return this.http
      .get(this.stocksURL, {headers: this.headers})
      .map(
        (response: Response) => {
                    const data = response.json();
                    return data;
                }
      )
  }

  // private handleError(error: any): Promise<any> {
  //  console.error('An error occurred: ', error); // for demo only
  //  return Promise.reject(error.message || error);
  // }

  getPortfolioStocks(portfolio: string) {
    return this.http
      .get(this.stocksURL + portfolio, {headers: this.headers})
      .map(
        (response: Response) => {
                    const data = response.json();
                    return data;
                }
      )
  }

  addStock(ticker: string, portfolio: string) {
    return this.http
      .post(this.stocksURL + portfolio + '/' + ticker, ticker)
  }

  deleteStock(ticker: string) {
    return this.http
      .delete(this.stocksURL + ticker, ticker)
  }

  putSortOrder(sortingOrder: SortingOrder) {
    return this.http
      .put(this.sortingURL, sortingOrder, {headers: this.headers})
  }

}
