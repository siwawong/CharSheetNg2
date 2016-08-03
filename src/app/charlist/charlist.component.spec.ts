/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpService } from '../http.service';
import { Router }      from '@angular/router';
import { CharacterListService } from '../character-list.service';


import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CharlistComponent } from './charlist.component';

describe('Component: Charlist', () => {
  let _router: Router;
  let _httpService: HttpService;
  let characterListService: CharacterListService;
  
  beforeEachProviders(()=> [HttpService, Router])
  
  beforeEach(inject([HttpService, Router], (httpService, router) => {
    _router = router;
    _httpService = httpService;
  }))
  
  it('should create an instance', () => {
    let component = new CharlistComponent(_httpService, _router, characterListService);
    expect(component).toBeTruthy();
  });
});
