import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordConfirm } from './password-confirm';

describe('PasswordConfirm', () => {
  let component: PasswordConfirm;
  let fixture: ComponentFixture<PasswordConfirm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordConfirm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordConfirm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
