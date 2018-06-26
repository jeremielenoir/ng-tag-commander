import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagCommanderService} from './tag-commander.service/tag-commander.service';
import { TcSetVarsDirective } from './tc-set-vars.directive/tc-set-vars.directive';
import { Logger } from "angular2-logger/core";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  declarations: [TcSetVarsDirective],
  providers: [TagCommanderService, Logger]
})
export class NgxTagCommanderModule { }
