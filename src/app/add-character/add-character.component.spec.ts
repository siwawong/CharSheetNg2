/* tslint:disable:no-unused-variable */
import { Router } from '@angular/router';

import { TestBed, async } from '@angular/core/testing';
import { AddCharacterComponent } from './add-character.component';

describe('Component: AddCharacter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Router]
    })

    let router = TestBed.get(Router);
  })

  it('should create an instance', () => {
    let component = new AddCharacterComponent(router);
    expect(component).toBeTruthy();
  });
});
