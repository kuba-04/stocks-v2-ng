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
                if (result === true) {
                    this.router.navigate(['user/register-success']);
                } else {
                    this.loading = false;
                }
            }, error => {
              this.loading = false;
              this.error = error;
            });
  }
}
