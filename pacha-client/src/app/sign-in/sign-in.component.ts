import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

import { UserService } from './../shared/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  private form: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.form = formBuilder.group({
      "email": ["", Validators.required],
      "password": ["", Validators.required]
    });
  }

  onSignIn() {
    let formContents = this.form.value;
    this.userService.signIn(formContents.email, formContents.password)
      .subscribe(
      isSignedIn => this.router.navigateByUrl(''),
      error => console.log("Error", error),
      () => { }
      );
  }

}
