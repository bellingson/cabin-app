import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clear',
  template: ''
})

export class ClearComponent implements OnInit {

  constructor() { }

  ngOnInit() {

     localStorage.clear();
     document.cookie = '';

     document.location.href = '';


  }

}
