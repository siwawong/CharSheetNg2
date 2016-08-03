/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import {CharacterStat} from './character-stat';

describe('CharacterStat', () => {
  it('should create an instance', () => {
    let statId: string;
    let statName: string;
    let statValue: number;
    let statMax: number;
    let statType: string;
    expect(new CharacterStat(statId, statName, statValue, statMax, statType)).toBeTruthy();
  });
});
