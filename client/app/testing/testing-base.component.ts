import { Component } from '@angular/core';

@Component({
    selector: 'app-testing-base',
    template: `
      <div class="testing-wrapper">
        <router-outlet></router-outlet>
      </div>
      <app-portrait-message></app-portrait-message>
    `
})

export class TestingBaseComponent {

  constructor()  {

  }

}
