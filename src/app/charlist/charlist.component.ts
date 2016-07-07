import { Component, OnInit } from '@angular/core';

export interface Character {
  url: string;
  id: string;
  name: string;
}

@Component({
  moduleId: module.id,
  selector: 'app-charlist',
  templateUrl: 'charlist.component.html',
  styleUrls: ['charlist.component.css']
})
export class CharlistComponent implements OnInit {

  characters: Array<Character> = [
  ];
  
  constructor() {}

  ngOnInit() {
  }

}
