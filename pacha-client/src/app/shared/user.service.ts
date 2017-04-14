import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  private HEADERS = new Headers({ 'Content-Type': 'application/json' });

  public signedIn: BehaviorSubject<boolean>;

  constructor(private http: Http, private router: Router) {
    this.signedIn = new BehaviorSubject(false);
  }

  signIn(email: string, password: string): Observable<BehaviorSubject<boolean>> {
    return this.http.post('/api/sign-in', { email: email, password: password }, { headers: this.HEADERS })
      .map(response => response.json())
      .map(json => this.signUserIn(json))
  }

  signUp(username: string, email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('/api/sign-up', { username: username, email: email, password: password }, { headers: this.HEADERS })
        .map(response => response.json())
        .subscribe(
        next => resolve(this.signUserUp(next, email, password)),
        error => reject(error)
        );
    });
  }

  getUserSubscriptions() {
    return this.http.get('/api/user_subscriptions', { headers: this.HEADERS })
      .map(response => response.json());
  }

  signOut() {
    return this.http.post('/api/sign-out', {}, { headers: this.HEADERS })
      .map(response => response.json())
      .subscribe(
      next => this.signUserOut(next),
      error => console.error(error),
    );
  }

  isSignedIn() {
    return this.signedIn;
  }

  private signUserIn(response): BehaviorSubject<boolean> {
    if (response.error) {
      console.log("There was an error: ", response.error);
      this.signedIn.next(false);
      Observable.throw(response.error);
    }

    this.signedIn.next(true);
    return this.signedIn;
  }

  private signUserUp(response, email, password) {
    if (response.error) {
      console.log("There was an error: ", response.error);
      return { error: response.error };
    }
    return { error: null };
  }

  private signUserOut(response) {
    this.router.navigate(["/"])

    this.signedIn.next(false);
    return this.signedIn;
  }
}
