/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CharlistComponent } from './charlist.component';

describe('Component: Charlist', () => {
  it('should create an instance', () => {
    let component = new CharlistComponent();
    expect(component).toBeTruthy();
  });
});
