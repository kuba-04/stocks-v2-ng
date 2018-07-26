import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

import { Stock } from '../stock.model';
import { SortingOrder } from './sorting.model';
import { AuthenticationService } from '../auth/authentication.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StockListService {
  private stocksURL = 'http://localhost:8090/v2/stocks/';
  private sortingURL = 'http://localhost:8090/v2/sorting-service/';
  private stocks: Stock[] = [];

  constructor(private http: Http,
              private authenticationService: AuthenticationService) {}

  // getStocks() {
  //   return this.http
  //     .get(this.stocksURL, {headers: this.authenticationService.getAuthHeaders()})
  //     .map(
  //       (response: Response) => {
  //           const data = response.json();
  //           return data;
  //       }
  //     )
  // }

  getPortfolioStocks(portfolio: string) {
    return this.http
      .get(this.stocksURL + portfolio, {headers: this.authenticationService.getAuthHeaders()})
      .map(
        (response: Response) => {
          if (response.ok) {
            const data = response.json();
            return data;
          } else {
            console.log("you don't have access to see this")
          }
        })
  }

  addStock(ticker: string, portfolio: string) {
    return this.http
      .post(this.stocksURL + portfolio + '/' + ticker, ticker, {headers: this.authenticationService.getAuthHeaders()})
  }

  deleteStock(ticker: string) {
    return this.http
      .delete(this.stocksURL + ticker, {headers: this.authenticationService.getAuthHeaders()})
  }

  putSortOrder(sortingOrder: SortingOrder) {
    return this.http
      .put(this.sortingURL, sortingOrder, {headers: this.authenticationService.getAuthHeaders()})
  }
}
