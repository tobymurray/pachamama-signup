import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CsaSignUpComponent } from './csa-sign-up.component';
import { SignUpThanksComponent } from '../sign-up-thanks/sign-up-thanks.component'

describe('CsaSignUpComponent', () => {
  let component: CsaSignUpComponent;
  let fixture: ComponentFixture<CsaSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpModule,
        RouterTestingModule.withRoutes([
          { path: 'thanks', component: SignUpThanksComponent }
        ])
      ],
      declarations: [
        CsaSignUpComponent,
        SignUpThanksComponent
      ],
      providers: [
        { provide: Http, useClass: MockBackend }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsaSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
