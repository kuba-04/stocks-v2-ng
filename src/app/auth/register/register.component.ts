import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading = false;
  error = '';

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onRegister(form: NgForm) {
    this.loading = true;
    this.authenticationService.register(form.form.controls.username.value,
                                        form.form.controls.email.value,
                                        form.form.controls.password.value,
                                        form.form.controls.matchingPassword.value)
            .subscribe(result => {
                if (result == 200) {
                    this.router.navigate(['user/register-success']);
                } else {
                    this.error = 'Registration failed. Please try again'
                }
                this.loading = false;
            }, error => {
              if (error.status == 412) {
                  this.error = "Passwords don't match! Please try again";
              } else if (error.status == 422) {
                  this.error = "Invalid email format! Please try again";
              } else if (error.status == 409) {
                  this.error = "email already exists!";
              } else if (error.status == 406) {
                  this.error = "username already exists!";
              } else {
                  this.error = 'Registration failed. Please try again'
              }
              this.loading = false;
            });
  }
}
