import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDelete } from './recipe-delete';

describe('RecipeDelete', () => {
  let component: RecipeDelete;
  let fixture: ComponentFixture<RecipeDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
