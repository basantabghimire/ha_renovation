import { TestBed } from '@angular/core/testing';

import { HarTestimonialService } from './har-testimonial.service';

describe('HarTestimonialService', () => {
  let service: HarTestimonialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HarTestimonialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
