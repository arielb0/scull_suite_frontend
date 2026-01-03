import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationDetail } from './configuration-detail';

describe('ConfigurationDetail', () => {
  let component: ConfigurationDetail;
  let fixture: ComponentFixture<ConfigurationDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
