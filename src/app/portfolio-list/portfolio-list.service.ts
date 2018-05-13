import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { Portfolio } from '../portfolio.model';
import { StockListService } from '../stocks-list/stock-list.service';


@Injectable()
export class PortfolioListService {
  portfolios: string[] = [];
  newPortfolio: string;
  portfoliosChanged = new Subject<string[]>();

  constructor(private http: Http, private stockListService: StockListService) {}

  getPortfolios() {
    // return this.http.get('http://localhost:8090/v2/portfolios')
    return this.http.get('http://localhost:3000/v2/portfolios')
      .map(
        (response: Response) => {
                    const data = response.json();
                    return data;
                }
      )
  }

  addPortfolio(name: string) {
    this.newPortfolio = name;
    this.portfolios.push(name);
    this.portfoliosChanged.next(this.portfolios.slice());
  }

  deletePortfolio(index: number, portfolio: string) {
    return this.http.delete('http://localhost:3000/v2/portfolios/' + portfolio, portfolio)
  }


}
