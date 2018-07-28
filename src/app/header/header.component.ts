import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PortfolioListService } from '../portfolio-list/portfolio-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private portfolioListService: PortfolioListService,
    private router: Router,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {}

  onLogout() {
    this.authenticationService.logout().subscribe(result => {
        if (result == true) {
          // this.router.navigate(['user/login']);
          this.router.navigate(['/']);
          this.portfolioListService.refreshPortfolios();
          this.ngOnInit();
        }
    });
  }

}
