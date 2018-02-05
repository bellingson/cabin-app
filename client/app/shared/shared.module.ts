import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import {PortraitMessageComponent} from "./portrait-message.component";

@NgModule({
  imports: [CommonModule ],
  declarations: [ PortraitMessageComponent ],
  exports: [ PortraitMessageComponent ]
})

export class SharedModule { }
