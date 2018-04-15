import { Component, Injectable, HostListener, OnInit, OnDestroy, Input, Output, ElementRef, ViewChild, Renderer, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Portfolio } from '../portfolio.model';
import { PortfolioListService } from '../portfolio-list/portfolio-list.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router,
    private route: ActivatedRoute) {}

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
          )
      )
  }

  onEditPortfolio(portfolio: string) {
    this.activePortfolio = portfolio;
  }

  onAddPortfolio() {
    this.enabledPortfolioForm = true;
  }

  ngOnChanges() {
    this.subscription = this.portfolioListService.portfoliosChanged
      .subscribe(
        (portfolios: string[]) => this.portfolios.push(this.portfolioListService.newPortfolio)
      );
  }

  onDeletePortfolio(index: number, portfolio: string) {
    if (confirm("Are you sure you want to delete portfolio: " + portfolio + "?")) {
        this.portfolioListService.deletePortfolio(index, portfolio)
          .subscribe(
            (response) => {
              if(response.status === 200) {
                  this.portfolios.splice(index, 1);
                  this.router.navigate(['main'], { relativeTo: this.route });
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

}
