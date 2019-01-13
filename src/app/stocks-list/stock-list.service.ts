import { Injectable } from '@angular/core';
// import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';

import { Stock } from '../stock.model';
import { SortingOrder } from './sorting.model';
import { AuthenticationService } from '../auth/authentication.service';
import { Observable } from 'rxjs/Observable';
import { StockDto } from '../stockDto.model';

@Injectable()
export class StockListService {
  private stocksURL = 'http://localhost:8090/v2/stocks/';
  private sortingURL = 'http://localhost:8090/v2/sorting-service/';
  private stocks: Stock[] = [];

  constructor(private http: Http,
              private authenticationService: AuthenticationService) {}

  getPortfolioStocks(portfolio: string) {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var user = currentUser == null ? 'main' : currentUser.username;

    return this.http
      .get(this.stocksURL + user + '/' + portfolio, {headers: this.authenticationService.getAuthHeaders()})
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
    var user = JSON.parse(localStorage.getItem("currentUser")).username;
    var stock = new StockDto(user, portfolio, ticker);
    return this.http
      .post(this.stocksURL + "add", stock, {headers: this.authenticationService.getAuthHeaders()})
      .map(
        (response: Response) => {
          if (response.ok) {
            const data = response.json();
            return data;
          } else if (response.status ===  204) {
                alert("Sorry, we are not able to fetch data from the external service."
                  + " Please try again later.")
          } else {
                console.log(response);
              }
          },
          (error) => {
            if (error.status ===  404) {
              alert("Ticker not found!");
            } else {
              console.log(error);
            }
        })
  }

  deleteStock(ticker: string, portfolio: string) {
    var user = JSON.parse(localStorage.getItem("currentUser")).username;
    var stock = new StockDto(user, portfolio, ticker);
    return this.http
      .post(this.stocksURL + "delete", stock, {headers: this.authenticationService.getAuthHeaders()})
      .map(
        (response: Response) => {
          if (response.ok) {
            const data = response.json();
            return data;
          } else {
            console.log(response);
          }
        },
        (error) => console.log(error));
  }

  putCustomSortOrder(sortingOrder: SortingOrder) {
    return this.http
      .post(this.sortingURL + "custom", sortingOrder, {headers: this.authenticationService.getAuthHeaders()})
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

  putDefaultOrder(sortingOrder: SortingOrder) {
    return this.http
      .post(this.sortingURL + "default", sortingOrder, {headers: this.authenticationService.getAuthHeaders()})
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
}
