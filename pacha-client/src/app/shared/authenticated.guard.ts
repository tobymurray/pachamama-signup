import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from './user.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate() {
    if (!this.userService.isSignedIn()) {
      this.router.navigate(['/sign-in']);
      return false;
    }

    return true;
  }

}