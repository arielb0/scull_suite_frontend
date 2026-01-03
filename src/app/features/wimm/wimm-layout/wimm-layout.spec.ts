import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WimmLayout } from './wimm-layout';

describe('WimmLayout', () => {
  let component: WimmLayout;
  let fixture: ComponentFixture<WimmLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WimmLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WimmLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
