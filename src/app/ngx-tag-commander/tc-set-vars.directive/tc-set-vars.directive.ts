import { Directive, ElementRef, Input } from '@angular/core';
import { TagCommanderService } from '../tag-commander.service/tag-commander.service';

@Directive({
  selector: '[tcSetVars]'
})
export class TcSetVarsDirective {
  @Input('tcSetVars') data: object;
  constructor(el: ElementRef, tcService: TagCommanderService) { 
    console.log(event);
    tcService.setTcVars(this.data);
  }
}