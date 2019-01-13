import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'

import { Stock } from '../stock.model';
import { StockListService } from './stock-list.service';
import { SortingOrder } from './sorting.model';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../auth/authentication.service';
import { Subscription } from 'rxjs';
import { ParamConstants } from '../param.constants';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.css']
})
export class StocksListComponent implements OnInit {
  stocks: Stock[];
  editMode = false;
  sortingOrder: SortingOrder;
  selectedSorting: string[] = [];
  routes: Observable<string[]>;
  tab: string;
  buttonsEnabled = false;
  authSubscription: Subscription;

  constructor(private stockListService: StockListService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.tab = paramMap.get('id');
        this.retrieveData(this.tab);
        // subscribe to current login state
        this.authSubscription = this.authenticationService.updated
            .subscribe(tokenExists => {
              if (tokenExists) {
                this.buttonsEnabled = true;
              } else {
                if (this.authenticationService.getToken().length > 0) {
                  // this.tab = this.activatedRoute.snapshot.url.toString();
                  this.retrieveData(this.tab);
                  this.buttonsEnabled = true;
                } else {
                  this.buttonsEnabled = false;
                  this.retrieveData('main');
                }
              };

            });
      }, error => console.log('unauthorized')
    )
  }

  retrieveData(currentTab: string) {
    this.stockListService.getPortfolioStocks(currentTab)
      .subscribe(
        (stocks: any[]) => this.stocks = stocks,
        error => {
          this.authenticationService.logoutIfTokenExpired(error);
        }
      )
  }

  onDeleteStock(ticker: string) {
    const tab = this.activatedRoute.snapshot.url.toString();
    if (this.authenticationService.getToken().length > 0) {
      this.stockListService.deleteStock(ticker, tab)
      .subscribe(
        (stocks: any[]) => this.stocks = stocks,
        error => {
          console.log(error)
        }
      )
    }
  }

  onSortByAll() {
    const tab = this.activatedRoute.snapshot.url.toString();
    var user = JSON.parse(localStorage.getItem("currentUser")).username;
    this.stockListService.putDefaultOrder(new SortingOrder(user, SortingOrder.defaultSortOrder, tab))
      .subscribe(
        (stocks: any[]) => this.stocks = stocks,
        error => {
          console.log(error)
        }
      )
  }

  onSortByCustom() {
    const tab = this.activatedRoute.snapshot.url.toString();
    var user = JSON.parse(localStorage.getItem("currentUser")).username;
    this.stockListService.putCustomSortOrder(new SortingOrder(user, this.selectedSorting, tab))
      .subscribe(
        (stocks: any[]) => this.stocks = stocks,
        error => {
          console.log(error)
        }
      )
  }

  onSelectPB() {
    if (!this.selectedSorting.includes(ParamConstants.PRICE_TO_BOOK)) {
      this.selectedSorting.push(ParamConstants.PRICE_TO_BOOK);
    } else {
      this.selectedSorting = this.selectedSorting.filter(e => e !== ParamConstants.PRICE_TO_BOOK);
    }
  }

  onSelectEPS() {
    if (!this.selectedSorting.includes(ParamConstants.EPS)) {
      this.selectedSorting.push(ParamConstants.EPS);
    } else {
      this.selectedSorting = this.selectedSorting.filter(e => e !== ParamConstants.EPS);
    }
  }

  onSelectPE() {
    if (!this.selectedSorting.includes(ParamConstants.PE_RATIO)) {
      this.selectedSorting.push(ParamConstants.PE_RATIO);
    } else {
      this.selectedSorting = this.selectedSorting.filter(e => e !== ParamConstants.PE_RATIO);
    }
  }

  onSelectROE() {
    if (!this.selectedSorting.includes(ParamConstants.ROE)) {
      this.selectedSorting.push(ParamConstants.ROE);
    } else {
      this.selectedSorting = this.selectedSorting.filter(e => e !== ParamConstants.ROE);
    }
  }

  onSelectROA() {
    if (!this.selectedSorting.includes(ParamConstants.ROA)) {
      this.selectedSorting.push(ParamConstants.ROA);
    } else {
      this.selectedSorting = this.selectedSorting.filter(e => e !== ParamConstants.ROA);
    }
  }

  onSelectDivY() {
    if (!this.selectedSorting.includes(ParamConstants.DIVIDEND_YIELD)) {
      this.selectedSorting.push(ParamConstants.DIVIDEND_YIELD);
    } else {
      this.selectedSorting = this.selectedSorting.filter(e => e !== ParamConstants.DIVIDEND_YIELD);
    }
  }

  onSelectTrROE() {
    if (!this.selectedSorting.includes(ParamConstants.TREND_ROE)) {
      this.selectedSorting.push(ParamConstants.TREND_ROE);
    } else {
      this.selectedSorting = this.selectedSorting.filter(e => e !== ParamConstants.TREND_ROE);
    }
  }

  onSelectTrEPS() {
    if (!this.selectedSorting.includes(ParamConstants.TREND_EPS)) {
      this.selectedSorting.push(ParamConstants.TREND_EPS);
    } else {
      this.selectedSorting = this.selectedSorting.filter(e => e !== ParamConstants.TREND_EPS);
    }
  }

  onSelectTrDTE() {
    if (!this.selectedSorting.includes(ParamConstants.TREND_DEBT_TO_EQUITY)) {
      this.selectedSorting.push(ParamConstants.TREND_DEBT_TO_EQUITY);
    } else {
      this.selectedSorting = this.selectedSorting.filter(e => e !== ParamConstants.TREND_DEBT_TO_EQUITY);
    }
  }

  clearSelection() {
    if (this.selectedSorting.length > 0)
      this.selectedSorting = [];
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(evt: KeyboardEvent) {
    this.selectedSorting = [];
    this.editMode = false;
  }

}
