import { TestBed } from '@angular/core/testing';

import { FormContactServiceService } from './form-contact-service.service';

describe('FormContactServiceService', () => {
  let service: FormContactServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormContactServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
