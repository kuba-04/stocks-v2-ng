import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { StocksListComponent } from './stocks-list/stocks-list.component';
import { StockListService } from './stocks-list/stock-list.service';
import { StockAddComponent } from './stocks-list/stock-add/stock-add.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { PortfolioAddComponent } from './portfolio-list/portfolio-add/portfolio-add.component';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import { PortfolioListService } from './portfolio-list/portfolio-list.service';


@NgModule({
  declarations: [
    AppComponent,
    StocksListComponent,
    StockAddComponent,
    HeaderComponent,
    PortfolioListComponent,
    PortfolioAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [StockListService, PortfolioListService, HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
