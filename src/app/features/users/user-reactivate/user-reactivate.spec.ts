import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReactivate } from './user-reactivate';

describe('UserResendActivation', () => {
  let component: UserReactivate;
  let fixture: ComponentFixture<UserReactivate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserReactivate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReactivate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
