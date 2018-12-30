import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  loading = false;
  error = '';
  message = '';
  currentUser = '';

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.getCurrentUser();
  }

  onChangePassword(form: NgForm) {
    this.loading = true;
    var user = this.currentUser;
    if (user === '') {
      user = form.form.controls.username.value;
    }
    this.authenticationService.changePassword(user,
                                        form.form.controls.tempPassword.value,
                                        form.form.controls.newPassword.value,
                                        form.form.controls.matchingPassword.value)
            .subscribe(result => {
                if (result === 200) {
                    this.router.navigate(['/user/login']);
                } else {
                    this.error = 'Password incorrect';
                    this.loading = false;
                }
            }, error => {
              if (error.status == 412) {
                  this.error = "Passwords don't match! Please try again";
              }
              this.loading = false;
            });
  }

}
