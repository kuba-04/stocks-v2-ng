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
    private headers = new Headers({'Content-Type': 'application/json'});
    private token: string;

    constructor(private http: Http) {
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post(this.authUrl, JSON.stringify({username: username, password: password}), {headers: this.headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
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

    getToken(): String {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var token = currentUser && currentUser.token;
      return token ? token : "";
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.token = null;
    }

    // isAuthenticated() {
    //      return this.token != null;
    // }

    register(username: string, email: string, password: string, matchingPassword: string): Observable<boolean> {
        return this.http.post(
            this.registerUrl,
            JSON.stringify(
                  {username: username,
                   email: email,
                   password: password,
                   matchingPassword: matchingPassword
                  }),
            {headers: this.headers})

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
