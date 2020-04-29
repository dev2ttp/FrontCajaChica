import { TestBed } from '@angular/core/testing';

import { NgxToastrService } from './ngx-toastr.service';

describe('NgxToastrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxToastrService = TestBed.get(NgxToastrService);
    expect(service).toBeTruthy();
  });
});
