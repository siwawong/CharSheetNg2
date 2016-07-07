/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { HttpService } from './http.service';

describe('Http Service', () => {
  beforeEachProviders(() => [HttpService]);

  it('should ...',
      inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));
});
