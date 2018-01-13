import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settings = { level: 1 };

  constructor() { }

  ngOnInit() {
  }

  updateSettings(value: any) {



  }

}
