import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'

import { Stock } from '../stock.model';
import { StockListService } from './stock-list.service';
import { SortingOrder } from './sorting.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.css']
})
export class StocksListComponent implements OnInit {
  stocks: Stock[];
  editMode = false;
  editedStock: string;
  sortingOrder: SortingOrder;
  selectedSorting: string[] = [];
  routes: Observable<string[]>;
  tab: string;

  constructor(private stockListService: StockListService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.tab = paramMap.get('id');
        this.retrieveData();
      }
    )
  }

  retrieveData() {
    this.tab = this.activatedRoute.snapshot.url.toString();
    this.stockListService.getPortfolioStocks(this.tab)
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
    const tab = this.activatedRoute.snapshot.url.toString();
    this.stockListService.putSortOrder(new SortingOrder(SortingOrder.defaultSortOrder, tab))
      .subscribe(
        (response) => {
          if(response.status === 200) {
              this.retrieveData();
          }
        }
      );
  }

  onSortByCustom() {
    const tab = this.activatedRoute.snapshot.url.toString();
    this.stockListService.putSortOrder(new SortingOrder(this.selectedSorting, tab))
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

  clearSelection() {
    if (this.selectedSorting.length > 0)
      this.selectedSorting = [];
  }


  onEditStock(ticker: string) {
    this.editedStock = ticker;
    console.log(ticker);
    if (this.editMode !== true) {
      this.editMode = true;
    }
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(evt: KeyboardEvent) {
    this.selectedSorting = [];
    this.editMode = false;
    this.editedStock = "";
  }

}
