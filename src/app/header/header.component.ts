import { Component, Injectable, HostListener, OnInit, OnDestroy, Input, Output, ElementRef, ViewChild, Renderer } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Portfolio } from '../portfolio.model';
import { PortfolioListService } from '../portfolio-list/portfolio-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  enabledPortfolioForm: boolean = false;
  portfolios: Portfolio[];
  private subscription: Subscription;
  @ViewChild("portfolioSelected") portfolioSelected: ElementRef;
  enabledDelete = false;

  constructor(private portfolioListService: PortfolioListService, private renderer: Renderer) {}

  ngOnInit() {
    this.portfolios = this.portfolioListService.getPortfolios();
    this.subscription = this.portfolioListService.portfoliosChanged
      .subscribe(
        (portfolios: Portfolio[]) => this.portfolios = portfolios
      );
  }

  ngDoCheck() {
    console.log(this.portfolioSelected.nativeElement.classList);
    // if(this.portfolioSelected.nativeElement.classList.contains('active')) {
    //   this.enabledDelete = true;
    // }
  }

  onAddPortfolio() {
    this.enabledPortfolioForm = true;
  }

  onDeletePortfolio(portfolio: string) {
    // console.log("to delete:"+portfolio);
    // this.portfolioListService.deletePortfolio(index);
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(evt: KeyboardEvent) {
    this.enabledPortfolioForm = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
