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
export class HeaderComponent implements OnInit {

  constructor(private portfolioListService: PortfolioListService,
    // private stockListService: StockListService,
    private router: Router,
    // private route: ActivatedRoute,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {}

  onLogout() {
    this.authenticationService.logout().subscribe(result => {
        if (result == true) {
          this.router.navigate(['/portfolio/main']);
          this.portfolioListService.refreshPortfolios();
        }
    });
  }

}
