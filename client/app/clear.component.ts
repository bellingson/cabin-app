import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clear',
  template: ''
})

export class ClearComponent implements OnInit {

  constructor() { }

  ngOnInit() {

     localStorage.clear();
     // document.cookie = '';
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

     document.location.href = '';


  }

}
