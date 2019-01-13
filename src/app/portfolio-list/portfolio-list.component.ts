import { Component, OnInit, ViewChild, OnChanges, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { PortfolioListService } from './portfolio-list.service';
import { PortfolioAddComponent } from './portfolio-add/portfolio-add.component';
import { Subscription, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { StockListService } from '../stocks-list/stock-list.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent implements OnInit, OnDestroy, OnChanges {
  portfolios: string[] = ["main"];
  private subscription: Subscription;
  activePortfolio = "";
  private portfolioAddComponent: PortfolioAddComponent;
  portfoliosEnabled = false;
  authSubscription: Subscription;
  enabledPortfolioForm = false;

  constructor(private portfolioListService: PortfolioListService,
    private stockListService: StockListService,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
      this.authSubscription = this.authenticationService.updated
          .subscribe(tokenExists => {
            if (tokenExists) {
              this.portfoliosEnabled = true;
              this.retrievePortfolios();
            }
            else {
              this.portfoliosEnabled = false;
              this.portfolios = ["main"];
              if (this.authenticationService.getToken().length > 0) {
                  this.portfoliosEnabled = true;
                  this.retrievePortfolios();
              }
            }
          });

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
            ), error => {
              // console.log('unauthorized');
              this.authenticationService.logoutIfTokenExpired(error);
            }
        )
    }

    onEditPortfolio(portfolio: string) {
      this.activePortfolio = portfolio;
    }

    onAddPortfolio() {
      this.enabledPortfolioForm = true;
    }

    setActivePortfolio(portfolio: string) {
      this.activePortfolio = portfolio;
    }

    setEnabledPortfolioForm(enabled: boolean) {
      this.enabledPortfolioForm = enabled;
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
                    this.router.navigate(['portfolio/main']);
                }
              }
            );
      }
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

    onDisableForm(formEnabled: boolean) {
      this.enabledPortfolioForm = formEnabled;
    }

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(evt: KeyboardEvent) {
      this.enabledPortfolioForm = false;
    }

    //TODO figure out how to hide portfolio add form once you click onClickedOutside
    // onClickedOutside(e: MouseEvent) {
    // }
    // html:
    // <!-- (clickOutside)="onClickedOutside($event)" -->
}
