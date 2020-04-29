import { TestBed } from '@angular/core/testing';

import { PagoServiceService } from './pago-service.service';

describe('PagoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PagoServiceService = TestBed.get(PagoServiceService);
    expect(service).toBeTruthy();
  });
});
