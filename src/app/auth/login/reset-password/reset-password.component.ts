import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  loading = false;
  error = '';
  message = '';

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onReset(form: NgForm) {
    this.loading = true;
    this.authenticationService.resetPassword(form.form.controls.email.value)
            .subscribe(result => {
                if (result == 200) {
                    this.message = 'Reset link was sent. Please check your email.'
                } else {
                    this.error = 'Password reset failed. Please try again'
                }
                this.loading = false;
            }, error => {
              if (error.status == 404) {
                  this.message = "Email doesn't exist!";
                }
              this.loading = false;
            });
  }
}
