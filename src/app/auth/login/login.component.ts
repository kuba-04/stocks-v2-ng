import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { PortfolioListService } from '../../portfolio-list/portfolio-list.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  portfolios: string[] = ["main"];
  loading = false;
  error = '';

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private portfolioListService: PortfolioListService) {
  }

  ngOnInit() {
    this.authenticationService.logout();
  }

  onLogin(form: NgForm) {
    this.loading = true;
        this.authenticationService.login(form.form.controls.username.value,
                                         form.form.controls.password.value)
            .subscribe(result => {
                if (result === true) {
                    console.log('logged in successfully!')
                    this.router.navigate(['/portfolio/main']);
                    // this.portfolioListService.retrievePortfolios();
                    // this.portfolioListService.getPortfolios().subscribe(
                    //     (portfolios: string[]) => portfolios
                    //       .forEach((portfolio) => {
                    //         if (portfolio != "main") this.portfolios.push(portfolio)
                    //       }
                    //     )
                    // )
                    // this.stockListService.getPortfolioStocks('main').subscribe();  this is repeated
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            }, error => {
              this.error = error;
              this.loading = false;
            });
  }
}
