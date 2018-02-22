import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { StocksListComponent } from './stocks-list/stocks-list.component';
import { StockListService } from './stocks-list/stock-list.service';
import { StockAddComponent } from './stocks-list/stock-add/stock-add.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    StocksListComponent,
    StockAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [StockListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
