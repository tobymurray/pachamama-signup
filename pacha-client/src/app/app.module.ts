import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthenticatedGuard } from './shared/authenticated.guard';
import { CsaSignUpComponent } from './csa-sign-up/csa-sign-up.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PublicLandingComponent } from './public-landing/public-landing.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpThanksComponent } from './sign-up-thanks/sign-up-thanks.component';
import { UserService } from './shared/user.service';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PublicLandingComponent,
    CsaSignUpComponent,
    SignUpThanksComponent,
    FooterComponent,
    SignInComponent,
    AdminPanelComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    UserService,
    AuthenticatedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
