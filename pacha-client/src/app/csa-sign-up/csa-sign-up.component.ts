import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';


@Component({
  selector: 'app-csa-sign-up',
  templateUrl: './csa-sign-up.component.html',
  styleUrls: ['./csa-sign-up.component.css']
})
export class CsaSignUpComponent {

  provinces: String[] = [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Nova Scotia',
    'Nunavut',
    'Northwest Territories',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
    'Yukon',
  ]

  pickUpLocations: String[] = [
    "Moo Shu Ice Cream",
    "Orleans",
    "RA Center",
    "Kanata",
    "Pachamama Farm!"
  ]

  form: FormGroup;

  constructor(formBuilder: FormBuilder, private http: Http, private router: Router) {
    this.form = formBuilder.group({
      "firstName": ["", Validators.required],
      "lastName": ["", Validators.required],
      "addressOne": ["", Validators.required],
      "addressTwo": '',
      "city": ["", Validators.required],
      "postalCode": ["", Validators.required],
      "province": ["", Validators.required],
      "phone": ["", Validators.required],
      "email": ["", Validators.required],
      "shareSize": ["", Validators.required],
      "pickUpLocation": '',
      "passwords": formBuilder.group({
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required]
      }, { validator: this.passwordMatchValidator })
    });
  }

  onSubmit() {
    console.log("Form submitted");
    console.log(this.form.value);
    this.http.post('api/submit/', this.form.value)
      .map(response => response.json())
      .subscribe(
      next => this.router.navigate(["/thanks"]),
      error => console.error(error),
    );
  }

  passwordMatchValidator(group: FormGroup) {
    return group.get('password').value === group.get('confirmPassword').value
      ? null : { 'mismatch': true };
  }

}
