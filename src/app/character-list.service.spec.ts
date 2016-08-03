/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { CharacterListService } from './character-list.service';

describe('CharacterListService Service', () => {
  beforeEachProviders(() => [CharacterListService]);

  it('should ...',
      inject([CharacterListService], (service: CharacterListService) => {
    expect(service).toBeTruthy();
  }));
});
