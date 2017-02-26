import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicLandingComponent } from './public-landing/public-landing.component'

const routes: Routes = [
  { path: '', component: PublicLandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
