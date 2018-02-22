import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Stock } from '../stock.model';

@Injectable()
export class StockListService {

  private stocks: Stock[] = [];

  constructor(private http: Http) {}

  getStocks() {
    return this.http.get('http://localhost:8090/v2/stocks/')
      .map(
        (response: Response) => {
                    const data = response.json();
                    return data;
                }
      )
  }

  addStock(ticker: string) {
    return this.http.post('http://localhost:8090/v2/stocks/' + ticker, ticker)
  }

}
