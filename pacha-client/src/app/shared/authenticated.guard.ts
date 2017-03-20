import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from './user.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  isSignedIn: BehaviorSubject<boolean>;

  constructor(private userService: UserService, private router: Router) { 
    this.isSignedIn = userService.isSignedIn();
  }

  canActivate() {
    if (!this.isSignedIn.value) {
      this.router.navigate(['/sign-in']);
      return false;
    }

    return true;
  }

}