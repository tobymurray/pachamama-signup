import { Component, OnInit } from '@angular/core';

import { UserService } from './../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isSignedIn: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.isSignedIn().subscribe((isSignedIn) => this.isSignedIn = isSignedIn);
  }

}
