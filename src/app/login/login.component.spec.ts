/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('Component: Login', () => {
  it('should create an instance', () => {
    let component = new LoginComponent(new Router());
    expect(component).toBeTruthy();
  });
});
