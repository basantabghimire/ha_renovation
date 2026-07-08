import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppReviewComponent } from './review.component';

describe('AppReviewComponent', () => {
  let component: AppReviewComponent;
  let fixture: ComponentFixture<AppReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
