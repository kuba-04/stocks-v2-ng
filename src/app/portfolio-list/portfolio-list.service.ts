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

  constructor(private http: Http,
              private stockListService: StockListService,
              private authenticationService: AuthenticationService) {}

  getPortfolios() {
    return this.http.get('http://localhost:8090/v2/portfolios', {headers: this.authenticationService.getAuthHeaders()})
      .map(
        (response: Response) => {
          if (response.ok) {
            const data = response.json();
            return data;
          }
        })
  }

  refreshPortfolios() {
    // if (this.authenticationService.getToken() == null) {
    //   this.portfolios = ['main'];
    // }
    this.portfoliosChanged.next(this.portfolios.slice());
  }

  addPortfolio(name: string) {
    this.newPortfolio = name;
    this.portfolios.push(name);
    this.portfoliosChanged.next(this.portfolios.slice());
  }

  deletePortfolio(index: number, portfolio: string) {
    return this.http.delete('http://localhost:8090/v2/portfolios/' + portfolio, portfolio)
  }
}
