import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { Stock } from '../stock.model';
import { StockListService } from './stock-list.service';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.css']
})
export class StocksListComponent implements OnInit {
  stocks: Stock[];
  editMode = false;
  editedStock: string;

  constructor(private stockListService: StockListService) { }

  ngOnInit() {
    this.retrieveData();
  }

  retrieveData() {
    this.stockListService.getStocks()
      .subscribe(
        (stocks: any[]) => this.stocks = stocks
      );
  }

  onEditStock(ticker: string) {
    this.editMode = true
    this.editedStock = ticker;
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(evt: KeyboardEvent) {
    this.editMode = false;
  }

  onDeleteStock() {
    if (this.editMode) {
        this.stockListService.deleteStock(this.editedStock)
          .subscribe(
            (response) => {
              if(response.status === 200) {
                  // console.log("deleted: " + this.editedStock);
                  this.retrieveData();
              }
            }
          );
    }
  }


  // sort() {
  //   this.stockListService.getSortedStocks()
  //     .subscribe(
  //     (stocks: any[]) => this.stocks = stocks
  //     // (error) => console.log(error)
  //     );
  // }

}
