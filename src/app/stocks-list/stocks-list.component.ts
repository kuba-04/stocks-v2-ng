import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { Stock } from '../stock.model';
import { StockListService } from './stock-list.service';
import { SortingOrder } from './sorting.model';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.css']
})
export class StocksListComponent implements OnInit {
  stocks: Stock[];
  // editMode = false;
  editedStock: string;
  sortingOrder: SortingOrder;
  selectedSorting: string[] = [];

  constructor(private stockListService: StockListService) { }

  ngOnInit() {
    this.sortingOrder = new SortingOrder(SortingOrder.defaultSortOrder);
    this.retrieveData();
  }

  retrieveData() {
    this.stockListService.getStocks()
      .subscribe(
        (stocks: any[]) => this.stocks = stocks
      );
  }

  onDeleteStock(ticker: string) {
    this.stockListService.deleteStock(ticker)
          .subscribe(
            (response) => {
              if(response.status === 200) {
                  this.retrieveData();
              }
            }
          );
  }

  onSortByAll() {
    this.stockListService.putSortOrder(new SortingOrder(SortingOrder.defaultSortOrder))
      .subscribe(
        (response) => {
          if(response.status === 200) {
              this.retrieveData();
          }
        }
      );
  }

  onSortByCustom() {
    this.stockListService.putSortOrder(new SortingOrder(this.selectedSorting))
    .subscribe(
      (response) => {
        if(response.status === 200) {
            this.retrieveData();
        }
      }
    );
  }

  onSelectPB() {
    if (!this.selectedSorting.includes('priceToBook')) {
      this.selectedSorting.push('priceToBook');
    } else {
      this.selectedSorting = this.selectedSorting.filter(e => e !== 'priceToBook');
    }
  }

  onSelectEPS() {
    if (!this.selectedSorting.includes('latestEPS')) {
      this.selectedSorting.push('latestEPS');
    } else {
      this.selectedSorting = this.selectedSorting.filter(e => e !== 'latestEPS');
    }
  }

  onSelectPE() {
    if (!this.selectedSorting.includes('peRatio')) {
      this.selectedSorting.push('peRatio');
    } else {
      this.selectedSorting = this.selectedSorting.filter(e => e !== 'peRatio');
    }
  }

  onSelectROE() {
    if (!this.selectedSorting.includes('returnOnEquity')) {
      this.selectedSorting.push('returnOnEquity');
    } else {
      this.selectedSorting = this.selectedSorting.filter(e => e !== 'returnOnEquity');
    }
  }

  onSelectROA() {
    if (!this.selectedSorting.includes('returnOnAssets')) {
      this.selectedSorting.push('returnOnAssets');
    } else {
      this.selectedSorting = this.selectedSorting.filter(e => e !== 'returnOnAssets');
    }
  }

  onSelectDivY() {
    if (!this.selectedSorting.includes('dividendYield')) {
      this.selectedSorting.push('dividendYield');
    } else {
      this.selectedSorting = this.selectedSorting.filter(e => e !== 'dividendYield');
    }
  }

  onSelectTrROE() {
    if (!this.selectedSorting.includes('trendROE')) {
      this.selectedSorting.push('trendROE');
    } else {
      this.selectedSorting = this.selectedSorting.filter(e => e !== 'trendROE');
    }
  }

  onSelectTrEPS() {
    if (!this.selectedSorting.includes('trendEPS')) {
      this.selectedSorting.push('trendEPS');
    } else {
      this.selectedSorting = this.selectedSorting.filter(e => e !== 'trendEPS');
    }
  }

  onSelectTrDTE() {
    if (!this.selectedSorting.includes('trendDebtToEquity')) {
      this.selectedSorting.push('trendDebtToEquity');
    } else {
      this.selectedSorting = this.selectedSorting.filter(e => e !== 'trendDebtToEquity');
    }
  }

  // onEditStock(ticker: string) {
  //   this.editedStock = ticker;
  //   if (this.editMode !== true) {
  //     this.editMode = true;
  //   }
  // }

  // @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(evt: KeyboardEvent) {
  //   this.editMode = false;
  // }

}
