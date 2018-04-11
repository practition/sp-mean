import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-manager',
  templateUrl: './home-manager.component.html',
  styles: [
    `
  div {
    border: 2px green dotted;
  }
  `]
})
export class HomeManagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
