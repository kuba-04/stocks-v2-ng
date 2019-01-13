import { Component, OnInit, Input } from '@angular/core';
import { StocksListComponent } from '../stocks-list.component';
import { NgForm } from '@angular/forms';
import { Stock } from '../../stock.model';
import { StockListService } from '../stock-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../auth/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stock-add',
  templateUrl: './stock-add.component.html',
  styleUrls: ['./stock-add.component.css']
})
export class StockAddComponent implements OnInit {
  loading = false;
  buttonsEnabled = false;
  authSubscription: Subscription;

  constructor(private stockListService: StockListService,
              private stocksListComponent: StocksListComponent,
              private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.authSubscription = this.authenticationService.updated
        .subscribe(buttonsEnabled => this.buttonsEnabled = buttonsEnabled);
    if (this.authenticationService.getToken().length > 0) {
        this.buttonsEnabled = true;
    }
  }

  isPanelEnabled() {
    this.authenticationService.getToken() !== null;
  }

  onAddTicker(form: NgForm) {
    this.loading = true;
    const tab = this.activatedRoute.snapshot.url.toString();
    const func = this.stockListService.addStock(form.value.ticker, tab)
      .subscribe(
        (stocks: any[]) => this.stocksListComponent.stocks = stocks,
        error => {
          console.log(error)
        }
      )
      this.loading = false;
      form.reset();
  }
}
