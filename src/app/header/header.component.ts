import { Component, Injectable, HostListener, OnInit, OnDestroy, Input, Output, ElementRef, ViewChild, Renderer, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Portfolio } from '../portfolio.model';
import { PortfolioListService } from '../portfolio-list/portfolio-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StockListService } from '../stocks-list/stock-list.service';
import { AuthenticationService } from '../auth/authentication.service';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges {
  enabledPortfolioForm: boolean = false;
  portfolios: string[] = ["main"];
  private subscription: Subscription;
  activePortfolio: string = "";

  constructor(private portfolioListService: PortfolioListService,
    private stockListService: StockListService,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.retrievePortfolios();
    this.subscription = this.portfolioListService.portfoliosChanged
      .subscribe(
        (portfolios: string[]) => this.portfolios.push(this.portfolioListService.newPortfolio)
      );
  }

  retrievePortfolios() {
    this.portfolioListService.getPortfolios()
      .subscribe(
          (portfolios: string[]) => portfolios
            .forEach((portfolio) => {
              if (portfolio != "main") this.portfolios.push(portfolio)
            }
          ), error => console.log('unauthorized')
      )
  }

  onEditPortfolio(portfolio: string) {
    this.activePortfolio = portfolio;
  }

  onAddPortfolio() {
    this.enabledPortfolioForm = true;
  }

  ngOnChanges() {
  }

  onDeletePortfolio(index: number, portfolio: string) {
    if (confirm("Are you sure you want to delete portfolio: " + portfolio + "?")) {
        this.portfolioListService.deletePortfolio(index, portfolio)
          .subscribe(
            (response) => {
              if(response.status === 200) {
                  this.portfolios.splice(index, 1);
                  this.router.navigate(['portfolio/main'], { relativeTo: this.route });
              }
            }
          );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(evt: KeyboardEvent) {
    this.enabledPortfolioForm = false;
  }

  onLogout() {
    this.authenticationService.logout().subscribe(result => {
        if (result == true) {
          this.router.navigate(['user/login']);
          // this.router.navigate(['/'], { relativeTo: this.route });
          // this.stockListService.getPortfolioStocks("main").subscribe();
        }
    });
  }

}
