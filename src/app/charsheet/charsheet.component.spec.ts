/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CharsheetComponent } from './charsheet.component';

describe('Component: Charsheet', () => {
  let _activatedRoute: ActivatedRoute;
  beforeEachProviders(()=> [ActivatedRoute])
  
  beforeEach(inject([ActivatedRoute], (activatedRoute) => {
    _activatedRoute = activatedRoute;
  }))
  it('should create an instance', () => {
    let component = new CharsheetComponent(_activatedRoute);
    expect(component).toBeTruthy();
  });
});
