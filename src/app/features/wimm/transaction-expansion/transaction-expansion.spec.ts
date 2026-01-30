import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionExpansion } from './transaction-expansion';

describe('TransactionCard', () => {
  let component: TransactionExpansion;
  let fixture: ComponentFixture<TransactionExpansion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionExpansion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionExpansion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
