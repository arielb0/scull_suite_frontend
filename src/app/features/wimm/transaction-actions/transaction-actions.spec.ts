import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionActions } from './transaction-actions';

describe('TransactionActions', () => {
  let component: TransactionActions;
  let fixture: ComponentFixture<TransactionActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionActions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionActions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
