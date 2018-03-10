import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs/Subject';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Stock } from '../stock.model';
import { SortingOrder } from './sorting.model';

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

  deleteStock(ticker: string) {
    return this.http.delete('http://localhost:8090/v2/stocks/' + ticker, ticker)
  }

  putSortOrder(sortingOrder: SortingOrder) {
    return this.http.put('http://localhost:8090/v2/sorting-service', sortingOrder)
  }

}
