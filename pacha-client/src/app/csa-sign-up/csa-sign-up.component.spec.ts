import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsaSignUpComponent } from './csa-sign-up.component';

describe('CsaSignUpComponent', () => {
  let component: CsaSignUpComponent;
  let fixture: ComponentFixture<CsaSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsaSignUpComponent ]
    })
    .compileComponents();
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
