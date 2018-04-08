import { Component, Injectable, HostListener, OnInit, OnDestroy, Input, Output, ElementRef, ViewChild, Renderer } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Portfolio } from '../portfolio.model';
import { PortfolioListService } from '../portfolio-list/portfolio-list.service';
// import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  enabledPortfolioForm: boolean = false;
  portfolios: Portfolio[];
  private subscription: Subscription;
  activePortfolio: string = "";

  constructor(private portfolioListService: PortfolioListService,
    private renderer: Renderer) {}

  ngOnInit() {
    this.portfolios = this.portfolioListService.getPortfolios();
    this.subscription = this.portfolioListService.portfoliosChanged
      .subscribe(
        (portfolios: Portfolio[]) => this.portfolios = portfolios
      );
  }

  onEditPortfolio(portfolio: string) {
    console.log(portfolio);
    this.activePortfolio = portfolio;
  }

  onAddPortfolio() {
    this.enabledPortfolioForm = true;
  }

  onDeletePortfolio(index: number, portfolio: string) {
    if (confirm("Are you sure you want to delete portfolio: " + portfolio + "?")) {
        this.portfolioListService.deletePortfolio(index);
        // this.router.navigate(['../main'], {relativeTo: this.route});

    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(evt: KeyboardEvent) {
    this.enabledPortfolioForm = false;
  }

}
