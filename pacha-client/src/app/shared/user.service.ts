import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  private HEADERS = new Headers({ 'Content-Type': 'application/json' });
  private authToken: string = 'auth_token';
  private signedIn: boolean = false;

  constructor(private http: Http) {
    this.signedIn = !!localStorage.getItem(this.authToken);
  }

  signIn(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('/api/sign-in', { email: email, password: password }, { headers: this.HEADERS })
        .map(response => response.json())
        .subscribe(
        next => resolve(this._signUserIn(next)),
        error => reject(error)
        );
    });

  }

  signUp(username: string, email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('/api/sign-up', { username: username, email: email, password: password }, { headers: this.HEADERS })
        .map(response => response.json())
        .subscribe(
        next => resolve(this._signUp(next, email, password)),
        error => reject(error)
        );
    });
  }

  signOut() {
    this.http.post('/api/sign-out', {}, { headers: this.HEADERS })
      .map(response => response.json())
      .subscribe(
      next => this._signUserOut(next),
      error => console.error(error),
    );
  }

  isSignedIn() {
    return this.signedIn;
  }

  _signUserIn(response) {
    if (response.error) {
      console.log("There was an error: ", response.error);
      return { error: response.error };
    }

    localStorage.setItem(this.authToken, 'token');
    this.signedIn = true;
    return { error: null }
  }

  _signUp(response, email, password) {
    if (response.error) {
      console.log("There was an error: ", response.error);
      return { error: response.error };
    }
    return { error: null };
  }

  _signUserOut(response) {
    localStorage.removeItem(this.authToken);
    this.signedIn = false;
  }
}
