import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivate } from './user-activate';

describe('UserActivate', () => {
  let component: UserActivate;
  let fixture: ComponentFixture<UserActivate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserActivate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserActivate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
