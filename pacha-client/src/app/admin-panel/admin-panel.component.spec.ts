import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { UserService } from './../shared/user.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelComponent } from './admin-panel.component';

describe('AdminPanelComponent', () => {
  let component: AdminPanelComponent;
  let fixture: ComponentFixture<AdminPanelComponent>;
  let userService: UserService;
  let spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule
      ], declarations: [
        AdminPanelComponent
      ], providers: [
        UserService,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = fixture.debugElement.injector.get(UserService);
    spy = spyOn(userService, 'getUserSubscriptions').and.returnValue("test");
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
