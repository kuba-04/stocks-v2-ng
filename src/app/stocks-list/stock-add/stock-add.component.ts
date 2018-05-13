import { Component, OnInit, Input } from '@angular/core';
import { StocksListComponent } from '../stocks-list.component';
import { NgForm } from '@angular/forms';
import { Stock } from '../../stock.model';
import { StockListService } from '../stock-list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stock-add',
  templateUrl: './stock-add.component.html',
  styleUrls: ['./stock-add.component.css']
})
export class StockAddComponent implements OnInit {

  constructor(private stockListService: StockListService,
              private stocksListComponent: StocksListComponent,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  onAddTicker(form: NgForm) {
    const tab = this.activatedRoute.snapshot.url.toString();
    const func = this.stockListService.addStock(form.value.ticker, tab)
      .subscribe(
        (response) => {
          if (response.status === 200) {
            this.stocksListComponent.retrieveData();
          } else {
            console.log(response);
          }
        },
        (error) => {
          if (error.status ===  404) {
            alert("Ticker not found!");
          } else {
            console.log(error);
          }
        }
      );
      form.reset();
  }

}
