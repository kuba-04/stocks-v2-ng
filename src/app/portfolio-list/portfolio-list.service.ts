import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs/Subject';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Portfolio } from '../portfolio.model';

@Injectable()
export class PortfolioListService {

  private portfolios: Portfolio[] = [
    new Portfolio("main")
  ];
  portfoliosChanged = new Subject<Portfolio[]>();

  constructor(private http: Http) {}

  getPortfolios() {
    return this.portfolios;
    // return this.http.get('http://localhost:8090/v2/stocks/')
    //   .map(
    //     (response: Response) => {
    //                 const data = response.json();
    //                 return data;
    //             }
    //   )
  }

  addPortfolio(name: string) {
    // name = "portfolio/" + name;
    this.portfolios.push(new Portfolio(name));
    this.portfoliosChanged.next(this.portfolios.slice());

    // return this.http.post('http://localhost:8090/v2/stocks/' + ticker, ticker)
  }

  deletePortfolio(index: number) {
    // this.portfolios.splice(index, 1);
    // this.portfoliosChanged.next(this.portfolios.slice());
    // return this.http.delete('http://localhost:8090/v2/stocks/' + ticker, ticker)
  }

}
