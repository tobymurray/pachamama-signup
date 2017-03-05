
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { LocalStorage } from 'node-localstorage';

@Injectable()
export class UserService {


  private HEADERS = new Headers({ 'Content-Type': 'application/json' });
  private authToken: string = 'auth_token';
  private signedIn: boolean = false;
  private localStorage: LocalStorage;

  constructor(private http: Http) {
    this.localStorage = new LocalStorage();
    this.signedIn = !!this.localStorage.getItem(this.authToken);
  }

  signIn(username: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('/api/sign-in', { username: username, password: password }, { headers: this.HEADERS })
        .map(response => response.json())
        .subscribe(
        next => resolve(this._signUserIn(next)),
        error => {
          console.error(error);
          reject({ error: error });
        }
        );
    });

  }

  signUp(username: string, email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('/api/sign-up', { username: username, email: email, password: password }, { headers: this.HEADERS })
        .map(response => response.json())
        .subscribe(
        next => resolve(this._signUp(next, email, password)),
        error => {
          console.error(error);
          reject({ error: error });
        }
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
      console.log("There was an error: " + response.error);
      return { error: response.error };
    }

    this.localStorage.setItem(this.authToken, 'token');
    this.signedIn = true;
    return { error: null }
  }

  _signUp(response, email, password) {
    if (response.error) {
      console.log("There was an error: " + response.error);
      return { error: response.error };
    }
    return { error: null };
  }

  _signUserOut(response) {
    console.log(response);
    this.localStorage.removeItem(this.authToken);
    this.signedIn = false;
  }
}
