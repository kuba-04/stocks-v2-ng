import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { EventEmitter } from 'events';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    private authUrl = 'http://localhost:8090/user/login';
    private registerUrl = 'http://localhost:8090/user/register';
    private logoutUrl = 'http://localhost:8090/user/logout';
    private passwordResetUrl = 'http://localhost:8090/user/resetPassword';
    private changePasswordUrl = 'http://localhost:8090/user/changePassword';
    private deleteUserUrl = 'http://localhost:8090/user/delete';
    private token: string;
    private tokenUpdate = new BehaviorSubject<boolean>(false);
    updated = this.tokenUpdate.asObservable();

    constructor(private http: Http, private router: Router) {
    }

    public getAuthHeaders(): Headers {
      return new Headers({
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + this.getToken()
         });
    }

    getToken(): string {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var token = currentUser && currentUser.token;
      return token ? token : "";
    }

    getCurrentUser(): string {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser == null || currentUser == '') {
        return '';
      } else {
        return JSON.parse(localStorage.getItem('currentUser')).username;
      }
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http
          .post(this.authUrl,
                JSON.stringify({username: username, password: password}),
                {headers: this.getAuthHeaders()})
          .map((response: Response) => {
              // login successful if there's a jwt token in the response
              let token = response.json() && response.json().token;
              if (token) {
                  // store username and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                  this.token = response.json().token;
                  this.tokenUpdate.next(true);
                  return true;
              } else {
                  return false;
              }
          }).shareReplay();
    }

    // clear token remove user from local storage to log user out
    logout(): Observable<boolean> {
        return this.http
          .post(this.logoutUrl, "logoutUrl", {headers: this.getAuthHeaders()})
            .map((response: Response) => {
              if (response.ok) {
                localStorage.removeItem('currentUser');
                this.token = null;
                this.tokenUpdate.next(false);
                return true;
              } else {
                return false;
              }
            })
    }

    register(username: string, email: string, password: string, matchingPassword: string): Observable<number> {
        return this.http.post(
            this.registerUrl,
            JSON.stringify(
                  {username: username,
                   email: email,
                   password: password,
                   matchingPassword: matchingPassword
                  }),
            {headers: this.getAuthHeaders()})

            .map((response: Response) => {
              return response.status;
            })
    }

    resetPassword(email: string): Observable<number> {
      return this.http.post(
          this.passwordResetUrl, JSON.stringify({email: email}), {headers: this.getAuthHeaders()})
          .map((response: Response) => {
            return response.status;
          })
    }

    changePassword(currentUser: string, tempPassword: string, newPassword: string, matchingPassword: string): Observable<number> {
      return this.http.post(
          this.changePasswordUrl,
          JSON.stringify({
            username: currentUser,
            tempPassword: tempPassword,
            password: newPassword,
            matchingPassword: matchingPassword
          }),
          {headers: this.getAuthHeaders()}
        ).map((response: Response) => {
              return response.status;
        })
    }

    deleteUser(): Observable<boolean> {
      var currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
      return this.http.delete(
        this.deleteUserUrl + '/' + currentUser, {headers: this.getAuthHeaders()})
        .map((response: Response) => {
          if (response.ok) {
            localStorage.removeItem('currentUser');
            this.token = null;
            this.tokenUpdate.next(false);
            return true;
          } else {
            return false;
          }
        })
    }

    logoutIfTokenExpired(error: Response) {
      if (this.getToken() != null && error != null) {
            localStorage.removeItem('currentUser');
            this.token = null;
            this.tokenUpdate.next(false);
            this.router.navigate(['/portfolio/main']);
            console.log('Your token has expired. Please log in again.')
      }
    }
}
