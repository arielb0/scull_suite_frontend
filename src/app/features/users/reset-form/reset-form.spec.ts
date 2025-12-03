import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetForm } from './reset-form';

describe('ResetForm', () => {
  let component: ResetForm;
  let fixture: ComponentFixture<ResetForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
