import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimonRoutingModule } from './simon-routing.module';
import { SimonComponent } from './simon.component';


@NgModule({
  declarations: [
    SimonComponent
  ],
  imports: [
    CommonModule,
    SimonRoutingModule
  ]
})
export class SimonModule { }
