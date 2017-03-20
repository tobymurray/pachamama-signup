import { BehaviorSubject } from 'rxjs/Rx';
import { Component } from '@angular/core';

import { UserService } from './../shared/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  isSignedIn: BehaviorSubject<boolean>;

  constructor(private userService: UserService) {
    this.isSignedIn = userService.isSignedIn();
  }

  onSignOut() {
    this.userService.signOut();
  }
}
