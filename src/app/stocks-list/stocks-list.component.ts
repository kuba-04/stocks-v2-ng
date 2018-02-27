import { Component, OnInit } from '@angular/core';

import { Stock } from '../stock.model';
import { StockListService } from './stock-list.service';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.css']
})
export class StocksListComponent implements OnInit {
  stocks: Stock[];

  constructor(private stockListService: StockListService) { }

  ngOnInit() {
    this.retrieveData();
  }

  retrieveData() {
    this.stockListService.getStocks()
      .subscribe(
        (stocks: any[]) => this.stocks = stocks
        // (error) => console.log(error)
      );
  }

  sort() {
    this.stockListService.getSortedStocks()
      .subscribe(
      (stocks: any[]) => this.stocks = stocks
      // (error) => console.log(error)
      );
  }

}
