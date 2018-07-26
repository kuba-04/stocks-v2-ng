import { Component, OnInit, ViewChild, OnChanges, OnDestroy, HostListener } from '@angular/core';
import { Portfolio } from '../portfolio.model';
import { PortfolioListService } from './portfolio-list.service';
import { PortfolioAddComponent } from './portfolio-add/portfolio-add.component';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { StockListService } from '../stocks-list/stock-list.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent implements OnInit, OnDestroy, OnChanges {
  enabledPortfolioForm: boolean = false;
  portfolios: string[] = ["main"];
  private subscription: Subscription;
  activePortfolio: string = "";
  private portfolioAddComponent: PortfolioAddComponent;

  constructor(private portfolioListService: PortfolioListService,
    private stockListService: StockListService,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
      this.retrievePortfolios();
      this.subscription = this.portfolioListService.portfoliosChanged
        .subscribe(
          (portfolios: string[]) => this.portfolios.push(this.portfolioListService.newPortfolio)
        );
    }

    arePortfoliosEnabled() {
      return this.authenticationService.getToken() !== null;
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
}
