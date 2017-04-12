import { UserSubscriptionData } from './../../../../server/models/sign_up_form/user_subscription_data';
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { UserService } from './../shared/user.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  private userSubscriptions;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserSubscriptions().subscribe(
      next => this.handleResponse(next),
      error => console.error("Error: ", error)
    );
  }

  private handleResponse(userSubscriptions) {
    console.log(userSubscriptions);
    this.userSubscriptions = userSubscriptions;
  }

}
