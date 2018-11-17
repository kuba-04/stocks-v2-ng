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
              // if (error.status == 412) {
              //     this.error = "Passwords don't match! Please try again";
              // } else if (error.status == 422) {
              //     this.error = "Invalid email format! Please try again";
              // } else if (error.status == 409) {
              //     this.error = "email already exists!";
              // } else if (error.status == 406) {
              //     this.error = "username already exists!";
              // } else {
              //     this.error = 'Registration failed. Please try again'
              // }
              this.loading = false;
            });
  }
}
