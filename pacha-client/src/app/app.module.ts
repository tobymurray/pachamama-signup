import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PublicLandingComponent } from './public-landing/public-landing.component';
import { CsaSignUpComponent } from './csa-sign-up/csa-sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PublicLandingComponent,
    CsaSignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
