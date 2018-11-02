import { Component, OnInit, Output } from '@angular/core';
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
                    this.router.navigate(['/portfolio/main']);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            }, error => {
              this.error = error._body.includes('User disabled') ?
                "Oops! You probably didn't click on the link in the confirmation email. Please check your email." :
                "Bad credentials! You used a wrong password or the username doesn't exist! Please try again."
              this.loading = false;
            });
  }
}
