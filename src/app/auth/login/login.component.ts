import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // model: any = {};
  loading = false;
  error = '';

  constructor(private router: Router,
    private authenticationService: AuthenticationService) {
      // this.active = true;
      // console.log(router.config.values);
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  onLogin(form: NgForm) {
    this.loading = true;
        this.authenticationService.login(form.form.controls.username.value,
                                         form.form.controls.password.value)
            .subscribe(result => {
                if (result === true) {
                // if (result.status === 200) {
                    // login successful
                    this.router.navigate(['portfolio/main']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            }, error => {
              this.loading = false;
              this.error = error;
            });
  }
}
