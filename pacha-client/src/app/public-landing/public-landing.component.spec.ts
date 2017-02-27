import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PublicLandingComponent } from './public-landing.component';
import { CsaSignUpComponent } from '../csa-sign-up/csa-sign-up.component'

@Component({
  template: ''
})
class DummyComponent { }

describe('PublicLandingComponent', () => {
  let component: PublicLandingComponent;
  let fixture: ComponentFixture<PublicLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpModule,
        RouterTestingModule.withRoutes([
          { path: 'thanks', component: DummyComponent }
        ])
      ],
      declarations: [
        PublicLandingComponent,
        CsaSignUpComponent,
        DummyComponent
      ],
      providers: [
        { provide: Http, useClass: MockBackend }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
