import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationService {
    private authUrl = 'http://localhost:8090/user/login';
    private registerUrl = 'http://localhost:8090/user/register';
    private logoutUrl = 'http://localhost:8090/user/logout';
    private token: string;

    constructor(private http: Http) {
    }

    public getAuthHeaders(): Headers {
      return new Headers({
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + this.getToken()
         });
    }

    getToken(): String {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var token = currentUser && currentUser.token;
      return token ? token : "";
    }

    isAuthenticated() {
         return this.token != null;
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
                  return true;
              } else {
                  // failed login
                  return false;
              }
          }).shareReplay();
          // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    logout(): Observable<boolean> {
        // clear token remove user from local storage to log user out
        console.log("logging out...");
        return this.http
          .post(this.logoutUrl, "logoutUrl", {headers: this.getAuthHeaders()})
            .map((response: Response) => {
              if (response.ok) {
                localStorage.removeItem('currentUser');
                this.token = null;
                console.log('logged out');
                return true;
              } else {
                console.log('log out failed!')
                return false;
              }
            })
    }

    register(username: string, email: string, password: string, matchingPassword: string): Observable<boolean> {
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
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (response.ok) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    this.token = response.json().token;
                    // successful login
                    return true;
                } else {
                    // failed login
                    return false;
                }
            })
            // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}
