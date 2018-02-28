import { Component, OnInit, Input } from '@angular/core';
import { StocksListComponent } from '../stocks-list.component';
import { NgForm } from '@angular/forms';
import { Stock } from '../../stock.model';
import { StockListService } from '../stock-list.service';

@Component({
  selector: 'app-stock-add',
  templateUrl: './stock-add.component.html',
  styleUrls: ['./stock-add.component.css']
})
export class StockAddComponent implements OnInit {

  constructor(private stockListService: StockListService,
              private stocksListComponent: StocksListComponent) { }

  ngOnInit() {
  }

  onAddTicker(form: NgForm) {
    const func = this.stockListService.addStock(form.value.ticker)
      .subscribe(
        (response) => {
          if (response.ok) {
            // console.log("STATUS IS: " + response.status);
            this.stocksListComponent.retrieveData()
          }

        },
        (error) => console.log(error)
      );
  }

}
