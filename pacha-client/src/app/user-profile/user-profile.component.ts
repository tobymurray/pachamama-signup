import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';

import { UserService } from './../shared/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private id: number;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    console.log("ngOnInit");
    console.log("Route:", this.route);
    console.log(this.route.snapshot.params['id']);
    this.route.params
      .switchMap((params: Params) => {
        console.log(params['id']);
        return null;
      });
  }

}
