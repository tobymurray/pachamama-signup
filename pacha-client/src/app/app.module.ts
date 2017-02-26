import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PublicLandingComponent } from './public-landing/public-landing.component';
import { CsaSignUpComponent } from './csa-sign-up/csa-sign-up.component';
import { SignUpThanksComponent } from './sign-up-thanks/sign-up-thanks.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PublicLandingComponent,
    CsaSignUpComponent,
    SignUpThanksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
