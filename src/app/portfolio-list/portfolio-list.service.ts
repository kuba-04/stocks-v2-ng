import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { Portfolio } from '../portfolio.model';
import { StockListService } from '../stocks-list/stock-list.service';
import { AuthenticationService } from '../auth/authentication.service';


@Injectable()
export class PortfolioListService {
  portfolios: string[] = [];
  newPortfolio: string;
  portfoliosChanged = new Subject<string[]>();
  private portfolioUrl = 'http://localhost:8090/v2/portfolios/';

  constructor(private http: Http,
              private stockListService: StockListService,
              private authenticationService: AuthenticationService) {}

  getPortfolios() {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var user = currentUser == null ? 'main' : currentUser.username;
    return this.http.get(this.portfolioUrl + user, {headers: this.authenticationService.getAuthHeaders()})
      .map(
        (response: Response) => {
          if (response.ok) {
            const data = response.json();
            return data;
          }
        })
  }

  refreshPortfolios() {
    this.portfoliosChanged.next(this.portfolios.slice());
  }

  addPortfolio(name: string) {
    this.newPortfolio = name;
    this.portfolios.push(name);
    this.portfoliosChanged.next(this.portfolios.slice());
  }

  deletePortfolio(index: number, portfolio: string) {
    var user = JSON.parse(localStorage.getItem("currentUser")).username;
    return this.http.delete(this.portfolioUrl + user + '/'+ portfolio, {headers: this.authenticationService.getAuthHeaders()})
  }
}
