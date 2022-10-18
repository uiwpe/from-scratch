import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvoidDirective } from './directive/avoid.directive';



@NgModule({
  declarations: [
    AvoidDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AvoidDirective
  ]
})
export class SharedModule { }
