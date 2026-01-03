import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDelete } from './transaction-delete';

describe('TransactionDelete', () => {
  let component: TransactionDelete;
  let fixture: ComponentFixture<TransactionDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
