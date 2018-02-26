import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import {PortraitMessageComponent} from "./portrait-message.component";
import { BadgesComponent } from './badges.component';

@NgModule({
  imports: [CommonModule ],
  declarations: [ PortraitMessageComponent, BadgesComponent ],
  exports: [ PortraitMessageComponent, BadgesComponent ]
})

export class SharedModule { }
