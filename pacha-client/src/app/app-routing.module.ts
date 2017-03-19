import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthenticatedGuard } from './shared/authenticated.guard';
import { PublicLandingComponent } from './public-landing/public-landing.component';
import { SignUpThanksComponent } from './sign-up-thanks/sign-up-thanks.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { path: '', component: PublicLandingComponent },
  { path: 'thanks', component: SignUpThanksComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthenticatedGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
